export const dashboardBalanceTranslations = {
  ru: {
    currency: 'Валюта баланса', loading: 'Загрузка остатков…',
    error: 'Не удалось загрузить все долги и платежи. Итоги не показаны, чтобы избежать неполного расчёта.',
    invalid: 'В ответе API обнаружены неполные или противоречивые финансовые данные. Баланс не рассчитан.',
    limit: 'Для этой валюты больше {{limit}} долгов. API требует отдельного запроса платежей для каждого долга; точный итог сейчас недоступен.',
    empty: 'В выбранной валюте долгов нет.', retry: 'Повторить', info: 'Как рассчитан баланс',
    explanation: 'Исходная сумма каждого долга минус все его платежи. Направление задаёт знак; переплата меняет его. Учитываются и погашенные долги. Валюты считаются отдельно, статусы не заменяют историю платежей.',
  },
  tj: {
    currency: 'Асъори бақия', loading: 'Боркунии бақияҳо…',
    error: 'Ҳамаи қарзҳо ва пардохтҳо бор нашуданд. Барои пешгирии ҳисоби нопурра натиҷаҳо нишон дода намешаванд.',
    invalid: 'API маълумоти молиявии нопурра ё мухолиф баргардонд. Бақия ҳисоб нашуд.',
    limit: 'Барои ин асъор зиёда аз {{limit}} қарз ҳаст. API барои пардохтҳои ҳар қарз дархости алоҳида талаб мекунад; натиҷаи дақиқ ҳоло дастрас нест.',
    empty: 'Бо асъори интихобшуда қарз нест.', retry: 'Такрор', info: 'Тарзи ҳисоб кардани бақия',
    explanation: 'Маблағи ибтидоии ҳар қарз минус ҳамаи пардохтҳои он. Самти қарз аломатро муайян мекунад; пардохти зиёдатӣ онро иваз мекунад. Қарзҳои пардохтшуда низ ба ҳисоб гирифта мешаванд. Асъорҳо ҷудо ҳисоб мешаванд; вазъият таърихи пардохтҳоро иваз намекунад.',
  },
  en: {
    currency: 'Balance currency', loading: 'Loading balances…',
    error: 'Could not load every debt and payment. Totals are hidden to avoid showing a partial calculation.',
    invalid: 'The API returned incomplete or conflicting financial data. Balances could not be calculated.',
    limit: 'There are more than {{limit}} debts in this currency. The API requires a separate payment request per debt; an exact total is currently unavailable.',
    empty: 'No debts in the selected currency.', retry: 'Retry', info: 'How balances are calculated',
    explanation: 'Each original debt amount minus all its payments. Direction determines the sign; overpayment reverses it. Paid debts are included. Currencies are calculated separately, and statuses never substitute for payment history.',
  },
}
