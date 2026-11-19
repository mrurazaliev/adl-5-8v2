# PROJECT_CONTEXT.md — ADL58 V2

Документ восстановления контекста. Обновляется при значимых изменениях проекта.

## 1. Текущий статус

Проект находится на этапе **завершённой инициализации**. Реализована только стартовая страница. CRUD, бизнес-логика, страницы разделов, реальные API-запросы и авторизация **не реализованы**.

Репозиторий Git в каталоге проекта отсутствует (`git status` возвращает `not a git repository`). Коммиты и push не выполнялись.

## 2. Назначение приложения

- Название: **ADL58 V2**.
- Тип: Financial Management Dashboard.
- Назначение: управление долгами, контактами, папками, платежами, финансовой статистикой, пользователями и архивом.
- Это новая версия ADL58: сохраняются основные разделы и бизнес-контекст предыдущей версии, но интерфейс перерабатывается в стиле Premium Fintech.
- Источники старого frontend в текущей директории недоступны; детали бизнес-логики не восстанавливались выдумыванием.

## 3. Окружение

- Node.js: `24.15.0`, npm: `11.12.1`.
- Package manager: npm.
- Файл окружения: только `.env.example` со строкой `VITE_API_BASE_URL=`.
- Реального `.env` в проекте нет; секреты, ключи и пароли не сохранялись.
- Сборка генерирует `dist/` (игнорируется Git).

## 4. Технологии

| Область | Решение |
| --- | --- |
| Core | React 19, TypeScript 5.9, Vite 8 |
| Routing | react-router-dom 7, конфигурация в `src/main.tsx` |
| Styling | Tailwind CSS 4 + `@tailwindcss/vite`, shadcn/ui (Radix Nova), Lucide React |
| State | Redux Toolkit 2 + React Redux 9, client UI slice |
| Server state | RTK Query из `@reduxjs/toolkit/query/react` |
| Forms | React Hook Form 7, Zod 4, `@hookform/resolvers` |
| Charts | Recharts 3 |
| i18n | i18next 27 + react-i18next 18 |
| Utilities | clsx, tailwind-merge, date-fns, Sonner |
| Quality | ESLint 10 + typescript-eslint 8 |

Запрещено: Zustand, TanStack Query, Axios, отдельный Redux Thunk, Material UI, Next.js.

## 5. Структура frontend

```text
src/
  api/
    baseApi.ts
  app/
    hooks.ts
    store.ts
  assets/
  components/
    ui/          # сгенерировано shadcn CLI
    layout/      # каталог-заготовка
    shared/      # каталог-заготовка
  features/
    ui/
      uiSlice.ts
  hooks/
  i18n/
    index.ts
  lib/
    utils.ts
  pages/
    Dashboard/ Contacts/ Archive/
    Debts/     Folders/  Payments/
    Users/                 # каталоги-заготовки, файлов нет
  styles/
    index.css
  types/
  utils/
  App.tsx
  main.tsx
  vite-env.d.ts
```

Конфигурации в корне: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `eslint.config.js`, `components.json`, `.env.example`, `.gitignore`, `index.html`.

`README.md` остался от шаблона Vite и упоминает Oxlint; фактически используется ESLint. Считать авторитетными `package.json`, `eslint.config.js` и настоящие документы.

## 6. Маршрутизация и страницы

В `src/main.tsx` настроены `Provider`, `BrowserRouter`, `TooltipProvider`, `Routes` и `Toaster`. Пока объявлен только один маршрут:

- `/` → `App`.

`src/App.tsx` — минимальный стартовый экран: заголовок `ADL58 V2`, подзаголовок из i18n, `Card` и кнопка shadcn/ui, переключающая тему через `uiSlice`.

Запланированные разделы по условию задачи: Dashboard, Debts, Contacts, Folders, Payments, Users, Archive. Соответствующие каталоги созданы, но компоненты страниц и маршруты для них **не созданы**.

## 7. Redux Architecture

`src/app/store.ts`:

- `configureStore` с редьюсерами `ui` и `[baseApi.reducerPath]` (`api`).
- Middleware: `getDefaultMiddleware().concat(baseApi.middleware)`.
- `devTools: import.meta.env.DEV`.
- Экспортируются `store`, `RootState`, `AppDispatch`.

`src/app/hooks.ts`:

- `useAppDispatch = useDispatch.withTypes<AppDispatch>()`.
- `useAppSelector = useSelector.withTypes<RootState>()`.

`src/features/ui/uiSlice.ts`:

- Состояние: `theme: 'light' | 'dark'`, `sidebarOpen: boolean`.
- Actions: `setTheme`, `toggleTheme`, `setSidebarOpen`, `toggleSidebar`.
- Начальные значения: `theme: 'light'`, `sidebarOpen: false`.
- В `App.tsx` тема применяется классом `.dark` на `document.documentElement`.

Серверные данные не хранятся в обычных Redux slice.

## 8. RTK Query Architecture

`src/api/baseApi.ts`:

- `createApi({ reducerPath: 'api', baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL ?? '' }), endpoints: () => ({}) })`.
- Конкретных endpoint’ов нет.
- `tagTypes` не определены, пока не известны реальные ресурсы backend.
- Base API подключён к store; новая логика должна добавляться через `baseApi.injectEndpoints`.
- loading/error, кэш, рефетч и инвалидация будут обеспечиваться RTK Query после появления endpoint’ов.

## 9. i18n

`src/i18n/index.ts` инициализирует i18next через `initReactI18next`:

- Языки: `ru`, `tj`, `en`.
- Язык по умолчанию и fallback: `ru`.
- Минимальные ключи: `appTitle`, `subtitle`, `toggleTheme`.
- Переводы остальных разделов будут добавляться позже.

## 10. Design System

`src/styles/index.css` — единственный глобальный CSS:

- Импорты: Tailwind CSS v4, `tw-animate-css`, Geist, инлайновые стили shadcn после `eject`.
- Dark mode: `@custom-variant dark (&:is(.dark *))`.
- Токены: `--background`, `--foreground`, `--primary`, `--secondary`, `--muted`, `--border`, `--radius`, `--spacing`, `--success`, `--danger`, `--warning`, chart/sidebar.
- Палитра: primary `#7C3AED`, secondary `#4F46E5`, light background `#F8FAFC`, dark background `#0F172A`, success `#10B981`, danger `#EF4444`, warning `#F59E0B`.
- `--radius: 0.75rem`, `--spacing: 0.25rem`.
- `src/lib/utils.ts` экспортирует `cn` на основе `clsx` + `tailwind-merge`.

Компоненты shadcn/ui установлены через официальный CLI: Button, Card, Input, Label, Dialog, Alert Dialog, Dropdown Menu, Select, Table, Badge, Skeleton, Tabs, Sheet, Separator, Tooltip, Avatar и Field.

## 11. Ограничения backend

- backend существует и запущен локально **по условию задачи**, но его исходники и endpoint’ы в этом репозитории недоступны.
- Реальные пути, форматы запросов/ответов и механизм авторизации не изучены.
- Нельзя придумывать URL для debts, contacts, folders, payments, users, archive и других ресурсов.
- Не создавать mock backend, базу данных, моковые данные или фейковые хуки.
- Не изменять backend.
- Перед добавлением endpoint’ов нужно изучить реальные запросы/ответы backend и только затем описывать типы.

## 12. Принятые технические решения

1. Vite создан непосредственно в корне проекта, без вложенной папки.
2. TypeScript зафиксирован на `5.9.3`: версия из шаблона Vite (7.x) несовместима с peer-диапазоном `typescript-eslint` (`<6.1`).
3. Вместо исходного стека Zustand/TanStack Query/Axios финальной инструкцией заданы Redux Toolkit + RTK Query и react-router-dom; проект приведён к этому стеку.
4. shadcn/ui инициализирован с `-b radix -p nova`; требуемый `form` заменён на официальный компонент `Field` (актуальный подход из документации shadcn).
5. Сгенерированные компоненты импортируют `cn` из `@/lib/utils`, а не из сервисного пакета `cn`.
6. Выполнено официальное `shadcn eject`: CSS-утилиты инлайновы, runtime-зависимость `shadcn` удалена, `npm audit` показывает 0 уязвимостей. Будущие обновления `shadcn/tailwind.css` не применяются автоматически; компоненты по-прежнему можно добавлять CLI.
7. ESLint заменяет штатный Oxlint шаблона Vite; `.oxlintrc.json` удалён.

## 13. Статус проверок

Последний успешный прогон:

- `npm run lint` — без ошибок и предупреждений.
- `npm run typecheck` — без ошибок.
- `npm run build` — успешно.
- `npm run dev` — сервер поднялся, HTML отдан через `curl`.
- `npm audit --audit-level=moderate` — `found 0 vulnerabilities`.

## 14. Команды

```bash
npm install
cp .env.example .env
npm run dev
npm run lint
npm run typecheck
npm run build
```

Перед началом любой работы также прочитай `AGENTS.md`, `TASKS.md` и последние записи `DEVELOPMENT_LOG.md`.
