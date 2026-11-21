# PROJECT_CONTEXT.md — ADL58 V2

Документ восстановления контекста. Обновляется при значимых изменениях проекта.

## 1. Текущий статус

Проект находится на этапе **визуального UI-каркаса публичной части и внутреннего Dashboard**. Реализованы публичная главная `/`, страницы входа `/login` и регистрации `/register`, а также внутренний layout с маршрутом `/dashboard` и сохранёнными маршрутами `/debts`, `/contacts`, `/folders`, `/payments`, `/users`, `/archive` на демонстрационных данных из `src/mocks/mockData.ts`.
Dashboard приведён к трём карточкам, блоку «Финансовая статистика» и «Последние платежи», а также плавающей кнопке создания долга с демо-диалогами. Из таблицы долгов удалена колонка «Статус» при сохранении поля `status` в данных и фильтрах. Публичные страницы используют отдельные `PublicLayout`, `PublicHeader` и `AuthLayout` без Sidebar; язык и тема работают через существующие i18next и `uiSlice`. Реальные запросы подключены для login/register/refresh/logout, `GET /api/users/me`, contacts и dashboard summary; refreshToken хранится в localStorage, accessToken — в Redux. Внутренние маршруты защищены, добавлены меню пользователя и страница `/profile`. CRUD и финансовые расчёты **не реализованы**.

Git-репозиторий инициализирован в корне проекта. Состояние перед этим этапом: `dc17a2b7fed2866a2fc4c770afbce032f38220f5` (`feat: add premium fintech landing and auth pages`). Изменения левой панели auth фиксируются отдельным коммитом `refactor: redesign auth left panel`. Push не выполнялся.

## 2. Назначение приложения

- Название: **ADL58 V2**.
- Тип: Financial Management Dashboard.
- Назначение: управление долгами, контактами, папками, платежами, финансовой статистикой, пользователями и архивом.
- Это новая версия ADL58: сохраняются основные разделы и бизнес-контекст предыдущей версии, но интерфейс перерабатывается в стиле Premium Fintech.
- Источники старого frontend в текущей директории недоступны; детали бизнес-логики не восстанавливались выдумыванием.

## 3. Окружение

- Node.js: `24.15.0`, npm: `11.12.1`.
- Package manager: npm.
- Файл окружения: `.env.example` содержит `VITE_API_BASE_URL=http://localhost:4000`.
- Локальный `.env` создан с тем же публичным значением и игнорируется Git; секреты, ключи и пароли не сохранялись.
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
     layout/      # AppShell, SidebarNavigation, PublicLayout, PublicHeader, AuthLayout, ProfileMenu
     shared/      # PageHeader, StatCard, StatusBadge, FilterBar, DemoActionDialog, EmptyState, DebtActionFab, AuthInitializer, ProtectedRoute
   features/
     auth/
       authApi.ts
       authType.ts
       authSlice.ts
       registrSchema.tsx
       userApi.ts
     contacts/
       contactsApi.ts
     dashboard/
       dashboardApi.ts
     ui/
       uiSlice.ts

  hooks/
  i18n/
    index.ts
  lib/
    utils.ts
  mocks/
    mockData.ts            # только временные UI-данные, не backend
  pages/
    Auth/LoginPage.tsx
    Auth/RegisterPage.tsx
    Dashboard/DashboardPage.tsx
    Debts/DebtsPage.tsx
    Contacts/ContactsPage.tsx
    Folders/FoldersPage.tsx
    Payments/PaymentsPage.tsx
    Profile/ProfilePage.tsx
    Public/LandingPage.tsx
    Users/UsersPage.tsx
    Archive/ArchivePage.tsx
  styles/
    index.css
  types/
  utils/
  App.tsx
  main.tsx
  vite-env.d.ts
```

Конфигурации в корне: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `eslint.config.js`, `components.json`, `opencode.jsonc`, `.env.example`, `.gitignore`, `index.html`.

Документы восстановления контекста в корне: `AGENTS.md`, `PROJECT_CONTEXT.md`, `CODING_STYLE.md`, `TASKS.md`, `DEVELOPMENT_LOG.md`.

`README.md` остался от шаблона Vite и упоминает Oxlint; фактически используется ESLint. Считать авторитетными `package.json`, `eslint.config.js` и настоящие документы.

## 6. Маршрутизация и страницы

В `src/main.tsx` настроены `Provider`, `BrowserRouter` и `Routes`. Маршруты:

- `/` → `PublicLayout` + `LandingPage` (index)
- `/login` → `PublicLayout` + `AuthLayout` + `LoginPage`
- `/register` → `PublicLayout` + `AuthLayout` + `RegisterPage`
- `/dashboard` → `ProtectedRoute` → `App` (`AppShell`) + `DashboardPage`
- `/profile` → `ProtectedRoute` → `App` + `ProfilePage`
- `/debts` → `ProtectedRoute` + `DebtsPage`
- `/contacts` → `ContactsPage`
- `/folders` → `FoldersPage`
- `/payments` → `PaymentsPage`
- `/users` → `UsersPage`
- `/archive` → `ArchivePage`
- `*` → `Navigate to="/"`

`PublicLayout` отображает `PublicHeader` без Sidebar и используется для публичных и auth-страниц. `AuthLayout` добавляет двухколоночную композицию: слева тёмная минималистичная панель `#111820` с radial-gradient свечениями и текстом, справа — правый блок с формой через `Outlet`. Панель скрыта на мобильных экранах. `src/App.tsx` остался тонкой обёрткой над `AppShell`; внутренние пути разделов сохранены, в `SidebarNavigation` изменён только путь Dashboard на `/dashboard`. Язык и тема на публичных страницах переключаются через те же `i18next` и `uiSlice`. Защита внутренних маршрутов реализована компонентом `ProtectedRoute` из файла `src/components/shared/ProtextedRotues.tsx` (сохранённое имя файла); `AuthInitializer` восстанавливает сессию один раз при монтировании приложения. В `AppShell` меню пользователя стоит сразу после ThemeSwitcher; `Toaster` из sonner подключён один раз в `main.tsx`.

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
- В `AppShell` тема применяется классом `.dark` на `document.documentElement`.

`src/features/auth/authSlice.ts` хранит только клиентское состояние авторизации: `user`, `accessToken` и `status` (`checking`, `authenticated`, `unauthenticated`). Actions: `setCredentials`, `setAccessToken`, `setChecking`, `clearCredentials`. RefreshToken хранится в localStorage, но не в Redux. При logout вызываются `clearCredentials()` и `baseApi.util.resetApiState()`.

Серверные данные не хранятся в обычных Redux slice.

## 8. RTK Query Architecture

`src/api/baseApi.ts`:

- `createApi({ reducerPath: 'api', baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL, prepareHeaders: Authorization: Bearer <accessToken> }), endpoints: () => ({}) })`.
- `src/features/auth/authApi.ts` добавляет через `injectEndpoints` мутации `login`, `register`, `refresh` и `logout`; logout отправляет `POST /api/auth/logout` с типом `LogoutRequest` (`refreshToken`).
- `src/features/auth/userApi.ts` добавляет query `getMe`: `GET /api/users/me`, тип `AuthUser`.
- `src/features/contacts/contactsApi.ts` добавляет query `getContacts`: `GET /api/contacts`, тип `Contact` совпадает со структурой из задания/Swagger.
- `src/features/dashboard/dashboardApi.ts` добавляет query `getDashboardSummary`: `GET /api/dashboard/summary`.
- `authSlice.ts` подключён к store; `authSlice.tsx` как placeholder удалён из рабочего дерева.
- `tagTypes` не определены, пока не известны реальные ресурсы backend.
- Base API подключён к store; новая логика добавляется через `baseApi.injectEndpoints`.
- loading/error и состояние отправки mutations/queries обеспечиваются RTK Query.

## 9. i18n

`src/i18n/index.ts` инициализирует i18next через `initReactI18next`:

- Языки: `ru`, `tj`, `en`.
- Язык по умолчанию и fallback: `ru`.
- Ключи: `appTitle`, `subtitle`, `toggleTheme`, `language`, `navigation`, `demoMode`, группы `nav`, `common`, `pages`, `landing`, `auth`.
- Переводы добавлены для всех заголовков страниц, навигации, общих действий, подписей Dashboard, публичной главной и статичных auth-страниц. Тексты Hero заданы через `landing.hero`, возможности — через `landing.features`, формы — через `auth.*`.
- Детали DemoActionDialog пока заданы текстом в компонентах.
- Переключатель языка в `AppShell` вызывает `i18n.changeLanguage`.

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

- backend запущен локально на `http://localhost:4000`; `GET /health` возвращает `{"status":"ok"}`.
- Контракт login задан владельцем: `POST /api/auth/login`, payload `{ email, password }`, ответ `{ user, accessToken, refreshToken }`. Реальный POST с тестовыми несуществующими данными вернул `401`, что подтверждает наличие маршрута.
- Контракт logout задан владельцем: `POST /api/auth/logout`, payload `{ refreshToken }`; `OPTIONS` на этот путь вернул `204`. Реальный logout с валидным токеном не выполнялся.
- Контракт пользователя задан владельцем: `GET /api/users/me`; запрос без токена вернул `401`, маршрут существует. Реальные данные без учётных данных не проверялись.
- Контракт contacts задан владельцем: `GET /api/contacts`; `Contact` содержит `id`, `user_id`, `folder_id`, `name`, `phone`, `email`, `note`, `created_at`, `updated_at`. Запрос без токена вернул `401`, маршрут существует; реальные данные без учётных данных не проверялись.
- Исходники backend и контракты остальных ресурсов в этом репозитории недоступны; контракт `PATCH /api/users/me` не проверен, поэтому редактирование профиля не добавлялось.
- Нельзя придумывать URL для debts, contacts, folders, payments, users, archive и других ресурсов.
- Не создавать mock backend, базу данных или фейковые хуки. Временные UI-данные для визуального каркаса допустимы только в `src/mocks/mockData.ts` и не должны выдаваться за данные backend.
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
8. Для recovery-context добавлены `AGENTS.md`, `PROJECT_CONTEXT.md`, `CODING_STYLE.md`, `TASKS.md`, `DEVELOPMENT_LOG.md`; индивидуальный стиль владельца остаётся неподтверждённым до получения примеров предыдущих проектов.
9. Project-level `opencode.jsonc` включает автоматическую фоновую компакцию с сохранением `15000` токенов и буфером `20%`; схема `https://opencode.ai/config.json` подтверждает формат всех полей. После изменения конфигурации нужен перезапуск OpenCode.
10. Git-репозиторий инициализирован; начальный коммит создан, push не выполнялся.
11. Для визуального UI-этапа допущены статические данные только в `src/mocks/mockData.ts`; никаких mock API, мутаций, финансовых расчётов и CRUD-действий не добавлено.
12. Все демонстрационные диалоги используют нейтральные поля и отключённое сохранение; уточнение составов полей вынесено в `TASKS.md`.
13. PNG-макеты из `ADL58_V2_Designs/` не удалось прочитать встроенным image reader; OCR-инструменты отсутствуют, поэтому UI сверялся с `README.txt` и текстовыми требованиями задачи.
14. При доработке Dashboard `01_Dashboard_FINAL.png` был открыт image reader, но текущая модель не отображает содержимое изображений; изменения выполнялись строго по текстовым требованиям владельца и `README.txt`.
15. Donut chart и Quick Actions удалены только из Dashboard; Recharts для AreaChart сохранён, новые действия сведены к одному FAB с двумя демо-модалками.
16. Статус долга скрыт только из таблицы Debts: поле `status`, фильтры и вкладки сохранены без изменений.
17. Для вкладок Debts, Payments и Archive добавлены контейнеры с горизонтальной прокруткой: labels не вызывают переполнение страницы на 375px.
18. `DemoActionDialog` принимает опциональные `children`, чтобы будущие RHF + Zod поля можно было подставить без переписывания диалога; демо-поля, валидация и отправка остаются неизменными.
19. Публичный сайт `https://www.adl5-8.tj/` проверен через webfetch: доступен только SPA-оболочка с meta-описанием «Offline-first debt management platform…»; браузер и JS-рендер в окружении недоступны, поэтому содержание сверялось с текстовой задачей, а не с визуальным screenshot.
20. `/` отведён под Landing Page, Dashboard перенесён на `/dashboard`; в `SidebarNavigation` обновлены путь и active state Dashboard. Остальные внутренние разделы сохранили исходные пути `/debts`, `/contacts`, `/folders`, `/payments`, `/users`, `/archive`.
21. Публичные страницы выделены в `PublicLayout`/`PublicHeader`/`AuthLayout` и не используют Sidebar; переключатели языка и темы переиспользуют существующие механизмы.
22. Login и Register оставлены статичными: нейтральный `identifier`, пароль с toggles, отключённые кнопки отправки, без RHF/Zod, API, токенов и автоперехода. Точный формат identifier будет уточняться после изучения backend.

23. Левая панель `AuthLayout` переработана в минималистичном стиле: удалены яркий градиент, сетка, три карточки и демо-подпись; фон `#111820`, три угловых radial-gradient свечения с заданными rgba-значениями. Правый блок и общая логика auth-страниц не изменены.
24. Пункт 22 утратил силу для Login: после отдельного коммита `e64985a` форма использует RHF + Zod и RTK Query mutation; Register остался статичным.
25. Незакоммиченная предыдущая работа по login сохранена отдельным коммитом `e64985a`; пустой JSX-файл переименован из `authSlice.ts` в `authSlice.tsx` и не подключён к store.
26. Причина 404: локальный `.env` отсутствовал, поэтому `VITE_API_BASE_URL` был `undefined` и `fetchBaseQuery` отправлял запрос на origin Vite — `http://localhost:4190/api/auth/login`. Исправлено созданием локального `.env` с `VITE_API_BASE_URL=http://localhost:4000`; итоговый URL — `http://localhost:4000/api/auth/login`.
27. Debug `console.log` удалены; пользователю показывается безопасное сообщение об ошибке, токены и пароли в консоль не выводятся.
28. `ContactsPage` получает контакты только через `useGetContactsQuery`; моковые данные на странице полностью убраны, пустой ответ backend не подменяется моками.
29. В `ContactsPage` удалены дублирующийся импорт хука и внутренние Loading/Error/Empty блоки внутри карточек; кнопка обновления использует `isFetching`.
30. Незакоммиченные посторонние файлы (`baseApi.ts`, `store.ts`, `main.tsx`, auth/register/protected route, `contactsSlice.ts`) в этом этапе не изменялись; полные проверки проекта заблокированы ошибками в части из них.
31. Profile Menu размещён только в защищённом `AppShell` сразу после ThemeSwitcher; публичный `PublicHeader` не изменён, чтобы не показывать logout неавторизованным пользователям.
32. Имя в кнопке берётся из `state.auth.user`; до загрузки показывается нейтральный fallback `Пользователь` и буква `?`, моковые данные не используются.
33. Dropdown построен на существующем shadcn/ui `DropdownMenu`; Radix обеспечивает закрытие по Escape и outside click, а `variant="destructive"` даёт красный logout.
34. Logout добавлен как RTK Query mutation `POST /api/auth/logout`; при отсутствии refreshToken запрос не отправляется.
35. При любом исходе logout локальная сессия завершается: refreshToken удаляется, вызываются `clearCredentials()` и `baseApi.util.resetApiState()`, пользователь перенаправляется на `/login`. При ошибке сервера показывается toast, который не утверждает, что токен отозван.
36. Страница `/profile` получает данные только через `GET /api/users/me`; редактирование имени не добавлено без проверенного контракта `PATCH /api/users/me`.
37. Полные `npm run lint`, `npm run typecheck` и `npm run build` остаются заблокированными посторонними незакоммиченными файлами по явному решению владельца; для нового кода выполнены targeted ESLint/targeted TypeScript и `npx vite build`.

## 13. Статус проверок

Последний успешный прогон:

- `npm run lint` — без ошибок и предупреждений.
- `npm run typecheck` — без ошибок.
- `npm run build` — успешно, 2798 модулей; Vite предупреждает о размере JS-чанка (~1131 kB) из-за Recharts и общего bundle.
- `npm run dev -- --host 127.0.0.1 --port 4191 --strictPort` — `/login` и `/register` отдают `HTTP 200`; лог Vite без ошибок.
- `GET http://localhost:4000/health` — `HTTP 200`, `{"status":"ok"}`.
- `POST http://localhost:4000/api/auth/login` с несуществующими тестовыми данными — `HTTP 401`, заголовок CORS разрешает origin frontend; маршрут backend существует.
- До исправления `POST http://127.0.0.1:4190/api/auth/login` — `HTTP 404`; после добавления `.env` собранный JS содержит `http://localhost:4000` и `/api/auth/login`.
- На предыдущих этапах `npm run dev` на портах 4188/4189 подтвердил `HTTP 200` для публичных и внутренних маршрутов; `npm audit --audit-level=moderate` — `found 0 vulnerabilities`.
- Grep подтвердил отсутствие в `AuthLayout` яркого градиента, сетки, карточек, демо-подписи и `console.log` в исходниках.
- Браузерная проверка адаптивности, JS-рендера публичного сайта и консоли в текущем окружении недоступна; webfetch вернул только статическую SPA-оболочку.

Проверки этапа Contacts:

- `npx eslint src/pages/Contacts/ContactsPage.tsx` — успешно; Grep подтвердил один импорт `useGetContactsQuery`, `isFetching` и отсутствие `mockData`.
- Target `npx tsc` для Contacts и `npx vite build` — успешно.
- `npm run lint`, `npm run typecheck`, `npm run build` — заблокированы незакоммиченными посторонними файлами: синтаксис в `contactsSlice.ts` и неиспользуемые переменные в `LoginPage.tsx`/`RegisterPage.tsx`.
- `GET http://localhost:4000/api/contacts` без токена — `HTTP 401`; реальные контакты не запрашивались.

Проверки этапа Profile/Logout:

- Targeted ESLint для `ProfileMenu.tsx`, `ProfilePage.tsx`, `AppShell.tsx` и `main.tsx` — успешно.
- Targeted TypeScript для auth/profile/layout файлов — успешно; `npx vite build` — успешно.
- Dev-сервер на `127.0.0.1:4192` отдал `HTTP 200` для `/profile` и `/login`.
- `OPTIONS http://localhost:4000/api/auth/logout` — `HTTP 204`; `GET http://localhost:4000/api/users/me` без токена — `HTTP 401`; `GET /health` — `HTTP 200`.
- Полные `npm run lint`, `npm run typecheck`, `npm run build` по-прежнему блокируются незакоммиченными `contactsSlice.ts`, `LoginPage.tsx`, `RegisterPage.tsx` и `authApi.ts`; посторонние файлы не изменялись по решению владельца.
- Браузерная проверка dropdown, клавиатуры, повторного логина и восстановления сессии после перезагрузки требует ручного тестирования с реальными учётными данными.

## 14. Команды

```bash
npm install
cp .env.example .env
npm run dev
npm run lint
npm run typecheck
npm run build
```

Перед началом любой работы также прочитай `AGENTS.md`, `CODING_STYLE.md`, `TASKS.md`, последние записи `DEVELOPMENT_LOG.md`, а также проверь `git status --short` и `git log --oneline -10`.
