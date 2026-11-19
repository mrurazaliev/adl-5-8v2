# AGENTS.md — ADL58 V2

## Стартовый протокол

Перед началом любой работы в новой сессии OpenCode последовательно прочитай:

1. `PROJECT_CONTEXT.md` — текущее состояние проекта и принятые решения.
2. `TASKS.md` — что уже сделано, что в работе, что запланировано.
3. `DEVELOPMENT_LOG.md` — последние записи, особенно разделы «Проблемы», «Решения» и «Далее».

Если документация расходится с кодом, сначала проверь фактическое содержимое файлов, затем обнови документы. Не удаляй ранее зафиксированные решения без явного указания.

## Технологический стек

- React 19 + TypeScript 5.9 + Vite 8.
- React Router DOM 7; маршруты объявляются в `src/main.tsx`.
- Tailwind CSS v4 через `@tailwindcss/vite`, shadcn/ui (Radix Nova), Lucide React.
- Redux Toolkit + React Redux; серверное состояние — только RTK Query.
- React Hook Form + Zod + `@hookform/resolvers`.
- Recharts, i18next/react-i18next, date-fns, Sonner.
-clsx + tailwind-merge через `cn` в `src/lib/utils.ts`.
- ESLint 10 + typescript-eslint; тесты пока не настроены.

Не добавляй новые библиотеки без необходимости. Запрещены Zustand, TanStack Query, Axios, отдельный Redux Thunk, Material UI, Next.js.

## Архитектурные правила

- `@/*` — алиас на `src/*`; используй его для внутренних импортов.
- `src/api/baseApi.ts` — единственная база RTK Query. Конкретные endpoint’ы добавлять через `injectEndpoints`.
- `src/app/store.ts` и `src/app/hooks.ts` — store и типизированные хуки. Не создавай второй store.
- `src/features/ui/uiSlice.ts` — client-only UI состояние (тема, sidebar). Не храни в нём данные backend.
- `src/components/ui/` — компоненты shadcn/ui. Ставь новые через официальный CLI, не копируй вручную.
- `src/components/layout/`, `src/components/shared/` — будущие общие компоненты.
- `src/pages/<Section>/` — каталоги-заготовки. Полноценные страницы пока не создавать.
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

## API и backend

- Backend уже существует и запущен локально, но его исходники и endpoint’ы в этом репозитории недоступны.
- Единственный источник адреса — `VITE_API_BASE_URL` из `.env` (шаблон в `.env.example`).
- Не придумывай URL для debts, contacts, folders, payments, users, archive или любых других ресурсов.
- Не изменяй backend и не создавай базу данных/моковый сервер.
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
