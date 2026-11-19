# AGENTS.md — ADL58 V2

## Стартовый протокол

Перед началом любой работы в новой сессии OpenCode последовательно прочитай:

1. `PROJECT_CONTEXT.md` — текущее состояние проекта и принятые решения.
2. `CODING_STYLE.md` — подтверждённый стиль и границы бизнес-логики.
3. `TASKS.md` — что уже сделано, что в работе, что запланировано.
4. `DEVELOPMENT_LOG.md` — последние записи, особенно разделы «Проблемы», «Решения» и «Далее».
5. `git status --short` и `git log --oneline -10` — фактическое состояние репозитория.
6. Сравни документы с фактическим содержимым проекта.

О расхождениях между документами и кодом сообщи владельцу до начала реализации. Если расхождение не требует решения владельца, сначала проверь файлы, затем обнови документы. Не удаляй ранее зафиксированные решения без явного указания.

## Контекст OpenCode

- Project-level конфигурация находится в `opencode.jsonc`; глобальная конфигурация в `~/.config/opencode/opencode.jsonc` не изменяется без явной просьбы.
- Автоматическая компакция включена: `auto: true`, `background: true`, `keep.tokens: 15000`, `buffer: "20%"`.
- Конфигурация OpenCode загружается только при запуске; после изменения `opencode.jsonc` необходимо перезапустить OpenCode.
- Стиль и business-critical правила хранятся в `CODING_STYLE.md`; при отсутствии примеров индивидуальный стиль не выдумывается.

## Технологический стек

- React 19 + TypeScript 5.9 + Vite 8.
- React Router DOM 7; маршруты объявляются в `src/main.tsx`.
- Tailwind CSS v4 через `@tailwindcss/vite`, shadcn/ui (Radix Nova), Lucide React.
- Redux Toolkit + React Redux; серверное состояние — только RTK Query.
- React Hook Form + Zod + `@hookform/resolvers`.
- Recharts, i18next/react-i18next, date-fns, Sonner.
- clsx + tailwind-merge через `cn` в `src/lib/utils.ts`.
- ESLint 10 + typescript-eslint; тесты пока не настроены.

Не добавляй новые библиотеки без необходимости. Запрещены Zustand, TanStack Query, Axios, отдельный Redux Thunk, Material UI, Next.js.

## Архитектурные правила

- `@/*` — алиас на `src/*`; используй его для внутренних импортов.
- `src/api/baseApi.ts` — единственная база RTK Query. Конкретные endpoint’ы добавлять через `injectEndpoints`.
- `src/app/store.ts` и `src/app/hooks.ts` — store и типизированные хуки. Не создавай второй store.
- `src/features/ui/uiSlice.ts` — client-only UI состояние (тема, sidebar). Не храни в нём данные backend.
- `src/components/ui/` — компоненты shadcn/ui. Ставь новые через официальный CLI, не копируй вручную.
- `src/components/layout/` — общий shell и навигация; `src/components/shared/` — общие UI-компоненты разделов.
- `src/pages/<Section>/` — страницы разделов; текущая реализация визуальная, без backend и бизнес-логики.
- `src/styles/index.css` — единственный глобальный CSS с темами и токенами.
- Добавленные shadcn `tw-animate-css`/Geist и eject-стили уже зафиксированы; не откатывай их.

## Redux Toolkit и RTK Query

- Серверные данные — только RTK Query. Для загрузки, кэша, loading/error и инвалидации используй возможности `createApi`.
- Клиентские UI-флаги — только обычные slice’ы Redux Toolkit.
- В `store` уже подключены `baseApi.reducer` и `baseApi.middleware` через `getDefaultMiddleware().concat(...)`.
- `devTools` включён только в DEV.
- Используй `useAppDispatch` и `useAppSelector` из `src/app/hooks.ts`.
- Не создавай `tagTypes`, пока не изучены реальные ресурсы backend.
- Не добавляй моковые запросы, фейковые hooks и выдуманные пути API.
- Авторизацию не реализовывай, пока не изучен механизм backend.

## TypeScript

- Соблюдай настройки `tsconfig.app.json`: `noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax`, `noFallthroughCasesInSwitch`.
- Избегай `any`. Для публичных API, state и props описывай типы явно.
- Импорты типов пиши через `import type`, если это требуется `verbatimModuleSyntax`.
- Функциональные компоненты, понятные имена, минимум абстракций, без лишних комментариев.

## Формы

- Основные формы строить на React Hook Form + Zod + `@hookform/resolvers`.
- Схема Zod — единственный источник валидации; типы выводить через `z.infer`.
- Не дублировать валидацию вручную в обработчиках и не создавать `useState` для каждого поля без необходимости.
- Для контролов shadcn/ui использовать актуальный способ интеграции из документации; в текущей версии это компонент `Field`.

## Границы бизнес-логики

- Без отдельного разрешения не реализовывать расчёт балансов, переплат, финансовые вычисления, правила создания/погашения долгов и логику платежей.
- Не придумывать поля, правила и конечные точки, отсутствующие в требованиях или backend.
- Если задача требует бизнес-решения, остановиться и запросить решение у владельца или наставника.

## API и backend

- Backend уже существует и запущен локально, но его исходники и endpoint’ы в этом репозитории недоступны.
- Единственный источник адреса — `VITE_API_BASE_URL` из `.env` (шаблон в `.env.example`).
- Не придумывай URL для debts, contacts, folders, payments, users, archive или любых других ресурсов.
- Не изменяй backend и не создавай базу данных/моковый сервер.
- Временные UI-данные допустимы только в `src/mocks/mockData.ts` и не должны выдаваться за backend.
- Сначала изучи реальные запросы/ответы backend, затем добавляй типы и endpoint’ы.

## Premium Fintech Design

- Палитра зафиксирована в CSS-переменных `src/styles/index.css`: primary `#7C3AED`, secondary `#4F46E5`, light background `#F8FAFC`, dark background `#0F172A`, success `#10B981`, danger `#EF4444`, warning `#F59E0B`.
- Light/Dark mode работает через класс `.dark` на `html`; переключение пока через `uiSlice`.
- Используй токены shadcn (`--background`, `--primary`, `--muted`, `--border`, `--radius` и т.д.), а не хардкод цветов в компонентах.
- Соблюдай единые radius (`--radius: 0.75rem`) и spacing (`--spacing: 0.25rem`).
- Интерфейс должен быть адаптивным, минималистичным и консистентным с shadcn/ui.

## Проверки и документация

После изменений запускай:

```bash
npm run lint
npm run typecheck
npm run build
```

`npm run dev` — для проверки запуска приложения. Не заявляй об успехе, если команда не выполнялась.

После значимого этапа обнови `TASKS.md` и `DEVELOPMENT_LOG.md`. Не выполняй git push и не создавай коммиты без явной просьбы. Не записывай секреты, ключи и пароли.
