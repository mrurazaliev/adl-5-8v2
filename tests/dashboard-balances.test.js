import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import ts from 'typescript'

const source = readFileSync(new URL('../src/features/dashboard/dashboardBalances.ts', import.meta.url), 'utf8')
const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText
const module = { exports: {} }
new Function('exports', code)(module.exports)
const { amountToCents, getBalanceDebts, calculateDashboardBalances, formatBalanceCents } = module.exports

function debt(id, direction = 'i_owe_them', amount = 50, currency = 'TJS', contact_id = 'contact-a', status = 'pending') {
  return { id, user_id: 'owner', contact_id, direction, amount, currency, status }
}

function history(record, amounts) {
  return { debt: record, payments: amounts.map((amount, index) => ({ id: `${record.id}-payment-${index}`, debt_id: record.id, user_id: record.user_id, amount })) }
}

test('partial, full and overpayments in both directions, independent of status', () => {
  for (const direction of ['i_owe_them', 'they_owe_me']) {
    for (const status of ['pending', 'partial', 'paid']) {
      for (const [payments, expected] of [[[], -5000], [[20], -3000], [[50], 0], [[100], 5000]]) {
        const net = BigInt(expected) * (direction === 'i_owe_them' ? 1n : -1n)
        const result = calculateDashboardBalances([history(debt('one', direction, 50, 'TJS', 'contact-a', status), payments)], 'TJS')
        assert.equal(result.netBalanceCents, net.toString())
        assert.equal(result.theyOweMeCents, (net > 0n ? net : 0n).toString())
        assert.equal(result.iOweThemCents, (net < 0n ? -net : 0n).toString())
      }
    }
  }
})

test('multiple debts and contacts: positive/negative debt remainders stay separate', () => {
  const histories = [
    history(debt('a', 'they_owe_me', 100), [20]),
    history(debt('b', 'i_owe_them', 50), [100]),
    history(debt('c', 'i_owe_them', 70, 'TJS', 'contact-b'), [10]),
    history(debt('d', 'they_owe_me', 5, 'TJS', 'contact-c', 'paid'), [5]),
    history(debt('usd', 'they_owe_me', 1000, 'USD'), [300]),
    history(debt('rub', 'i_owe_them', 1000, 'RUB'), [1200]),
  ]
  assert.deepEqual(calculateDashboardBalances(histories, 'TJS'), { theyOweMeCents: '13000', iOweThemCents: '6000', netBalanceCents: '7000' })
  assert.equal(calculateDashboardBalances(histories, 'USD').netBalanceCents, '70000')
  assert.equal(calculateDashboardBalances(histories, 'RUB').netBalanceCents, '20000')
})

test('minor units are exact, including totals beyond Number.MAX_SAFE_INTEGER', () => {
  assert.equal(calculateDashboardBalances([history(debt('small', 'i_owe_them', '0.30'), ['0.10', '0.20'])], 'TJS').netBalanceCents, '0')
  const histories = Array.from({ length: 500 }, (_, index) => history(debt(String(index), 'they_owe_me', '999999999999.99'), []))
  assert.equal(calculateDashboardBalances(histories, 'TJS').netBalanceCents, (99999999999999n * 500n).toString())
  for (const value of [NaN, Infinity, 0, -1, '1.001', '1e2', '', null, '1000000000000.00']) assert.equal(amountToCents(value), null)
})

test('duplicate IDs are counted once; conflicting or unrelated operations are rejected', () => {
  const record = debt('a')
  assert.equal(getBalanceDebts([record, { ...record, amount: '50.00' }]).length, 1)
  assert.equal(getBalanceDebts([record, { ...record, amount: 70 }]), null)
  assert.equal(getBalanceDebts({ items: [record] }), null)
  const entry = history(record, [20])
  assert.equal(calculateDashboardBalances([{ ...entry, payments: [...entry.payments, ...entry.payments] }], 'TJS').netBalanceCents, '-3000')
  for (const changes of [{ amount: 25 }, { debt_id: 'other' }, { user_id: 'other' }]) {
    assert.equal(calculateDashboardBalances([{ ...entry, payments: [...entry.payments, { ...entry.payments[0], ...changes }] }], 'TJS'), null)
  }
  assert.equal(calculateDashboardBalances([entry, entry], 'TJS'), null)
  assert.equal(calculateDashboardBalances([{ debt: record, payments: { items: [] } }], 'TJS'), null)
})

test('empty history and selected currency are zero; signed formatting has two decimals', () => {
  assert.deepEqual(calculateDashboardBalances([], 'TJS'), { theyOweMeCents: '0', iOweThemCents: '0', netBalanceCents: '0' })
  assert.equal(formatBalanceCents('5000', 'ru', 'TJS', true), '+50,00 TJS')
  assert.equal(formatBalanceCents('-5000', 'ru', 'TJS', true), '−50,00 TJS')
  assert.equal(formatBalanceCents('0', 'ru', 'TJS', true), '0,00 TJS')
  assert.equal(formatBalanceCents('-1', 'en', 'USD', true), '−0.01 USD')
  assert.equal(formatBalanceCents('5000', 'en', 'USD'), '50.00 USD')
})
