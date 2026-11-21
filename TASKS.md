# TASKS.md — ADL58 V2

Статус обновляется после каждого значимого этапа. Задача переносится в Completed только после фактической проверки.

## Completed

- [x] Проверка текущей директории и окружения (пустой каталог, Node 24.15.0, npm 11.12.1).
- [x] Инициализация React + TypeScript + Vite непосредственно в корне проекта.
- [x] Установка зависимостей и приведение стека к Redux Toolkit + RTK Query + react-router-dom.
- [x] Настройка `package.json` со скриптами `dev`, `build`, `typecheck`, `lint`, `preview`.
- [x] Настройка TypeScript alias `@/* → src/*` в `tsconfig.json` и `tsconfig.app.json`.
- [x] Настройка Tailwind CSS v4 через `@tailwindcss/vite`.
- [x] Настройка ESLint 10 + typescript-eslint (Oxlint удалён).
- [x] Инициализация shadcn/ui через официальный CLI (`radix`, `nova`) и установка базовых компонентов.
- [x] Замена недоступного `form` на официальный компонент `Field` и подключение `cn` из `@/lib/utils`.
- [x] Создание Redux store, типизированных hooks и `uiSlice`.
- [x] Создание `baseApi` на `createApi`/`fetchBaseQuery` без endpoint’ов и tagTypes.
- [x] Подключение `Provider`, RTK Query middleware, `BrowserRouter` и маршрута `/` в `src/main.tsx`.
- [x] Минимальная стартовая страница `ADL58 V2` с Card и Button shadcn/ui.
- [x] Настройка i18n: ru (по умолчанию), tj, en с минимальными ключами.
- [x] Настройка Premium Fintech CSS-переменных, light/dark темы, radius/spacing.
- [x] Создание `.env.example`, `.gitignore` и подготовка каталогов под будущие разделы.
- [x] Проверки: `npm run lint`, `npm run typecheck`, `npm run build`, запуск `npm run dev`, `npm audit --audit-level=moderate`.
- [x] Создание файлов постоянного контекста: `AGENTS.md`, `PROJECT_CONTEXT.md`, `TASKS.md`, `DEVELOPMENT_LOG.md`.
- [x] Создание `CODING_STYLE.md` как черновика с зафиксированными требованиями владельца и границами бизнес-логики.
- [x] Инициализация Git-репозитория и создание начального коммита `d9a690a694345fbdf41169cdcb76a594e26ef694`.
- [x] Создание project-level `opencode.jsonc` с проверенной по официальной схеме автоматической компакцией.
- [x] Обновление `AGENTS.md`, `PROJECT_CONTEXT.md`, `TASKS.md` и `DEVELOPMENT_LOG.md` под текущее состояние проекта.
- [x] Проверка `AGENTS.md`, `PROJECT_CONTEXT.md`, `CODING_STYLE.md` и `opencode.jsonc`: расхождений с кодом и текущими решениями не найдено.
- [x] Повторная проверка `opencode.jsonc` по официальной схеме OpenCode: все параметры поддерживаются, устаревшие ключи не используются.
- [x] Повторные проверки `npm run lint`, `npm run typecheck`, `npm run build`, валидации JSON/ключей `opencode.jsonc` и `git diff --check`.
- [x] Создан `opencode.jsonc` и созданы коммиты `b1a21acd71103fcb5a43791e5d37a045b4e3c9b3` и `523e8c8f7f915da135e73da4e11ae4e6c6a39971` (без push).
- [x] Изучены `ADL58_V2_Designs/README.txt` и доступные PNG-макеты; визуальное чтение PNG заблокировано image reader, OCR недоступен.
- [x] Создан визуальный layout: `AppShell`, `SidebarNavigation`, мобильный `Sheet`, header с темой и языком.
- [x] Добавлены маршруты `/`, `/debts`, `/contacts`, `/folders`, `/payments`, `/users`, `/archive`.
- [x] Реализованы страницы Dashboard, Debts, Contacts, Folders, Payments, Users, Archive только как UI.
- [x] Добавлены shared-компоненты: `PageHeader`, `StatCard`, `StatusBadge`, `FilterBar`, `DemoActionDialog`, `EmptyState`.
- [x] Добавлены временные UI-данные только в `src/mocks/mockData.ts` (без API, мутаций и вычислений).
- [x] Расширены переводы i18n для навигации, общих действий и заголовков страниц.
- [x] Проверки после UI-этапа: `npm run lint`, `npm run typecheck`, `npm run build` — успешно.
- [x] После прерывания ECONNRESET повторно проверены документы, `git status`, все page/layout/shared/mock/i18n/entry-файлы и таблица маршрутов; готовые компоненты не переписывались.
- [x] Повторные проверки после восстановления: `npm run lint`, `npm run typecheck`, `npm run build` — успешно; маршруты `/`, `/debts`, `/contacts`, `/folders`, `/payments`, `/users`, `/archive` и fallback подтверждены в `src/main.tsx`.
- [x] Dashboard доработан точечно: убраны donut chart и Quick Actions, добавлены три карточки «Общий итог», «Мне должны», «Я должен».
- [x] График и блок «Последние платежи» размещены рядом на desktop и vertically на мобильных; Recharts сохранён.
- [x] Добавлен `DebtActionFab`: плавающая кнопка `Plus`, два демо-действия, закрытие по outside click/Escape, `aria-*` и transitions с `motion-reduce`.
- [x] `DemoActionDialog` расширен опциональным `saveLabel`; для новых модалок кнопка «Сохранить» остаётся disabled.
- [x] Обновлены `dashboardStats` и i18n-ключи для ru/tj/en без API, CRUD и финансовых расчётов.
- [x] Проверки после доработки Dashboard: `npm run lint`, `npm run typecheck`, `npm run build` — успешно; `npm run dev` отдал `HTTP 200`.
- [x] Из списка долгов на странице Debts удалена колонка «Статус» и статусные бейджи; ширины оставшихся колонок перераспределены.
- [x] Поле `status` оставлено в типах и данных; фильтры, кнопки, действия и другие страницы не изменены.
- [x] Повторные проверки `npm run lint`, `npm run typecheck`, `npm run build` после правки Debts — успешно.
- [x] Финальный UI-обзор: проверены Dashboard, Debts, Contacts, Folders, Payments, Users, Archive и общий layout.
- [x] Исправлено горизонтальное переполнение вкладок на 375px: Debts, Payments и Archive получили контейнеры с прокруткой.
- [x] `DemoActionDialog` подготовлен к будущим RHF + Zod через опциональные `children`; валидация и отправка не реализованы.
- [x] Проверки финального обзора: `npm run lint`, `npm run typecheck`, `npm run build` — успешно; все маршруты через dev-сервер отдают `HTTP 200`.
- [x] Изучены docs и фактическое состояние перед новым этапом: HEAD `bb646da`, tracked-изменений нет, untracked-макеты не трогались.
- [x] Публичный сайт `https://www.adl5-8.tj/` проверен через webfetch; JS-рендер недоступен, использованы только текст задачи и meta-описание.
- [x] Созданы `PublicLayout` и `PublicHeader` с логотипом, RU/TJ/EN, переключателем темы и кнопками «Войти»/«Регистрация».
- [x] Создан `LandingPage` с точными Hero-текстами, градиентным заголовком, сеткой, мягкими glows, тремя карточками возможностей и минимальным footer.
- [x] Создан `AuthLayout` с двухколоночной компоновкой без Sidebar; левая колонка содержит градиент, логотип, описание и декоративные элементы.
- [x] Созданы `LoginPage` и `RegisterPage`: нейтральный identifier, пароли с toggle видимости, отключённые кнопки отправки и ссылки между страницами.
- [x] Dashboard перенесён на `/dashboard`; остальные внутренние маршруты `/debts`, `/contacts`, `/folders`, `/payments`, `/users`, `/archive` сохранены, fallback остался на `/`.
- [x] `SidebarNavigation` обновлён под `/dashboard`; active state проверен по маршрутам.
- [x] i18n расширен ключами `landing.*` и `auth.*` для ru, tj, en; русский остался языком по умолчанию.
- [x] Проверки после публичного этапа: `npm run lint`, `npm run typecheck`, `npm run build` — успешно; dev-сервер на strict port 4188 отдаёт `HTTP 200` для `/`, `/login`, `/register`, `/dashboard`, исходных внутренних разделов и fallback.
- [x] Изучены документы, Git status и текущий `AuthLayout`; HEAD перед этапом `dc17a2b`, расхождение в документации зафиксировано.
- [x] Скриншоты для auth в сообщении и доступных директориях не найдены; работа выполнена по текстовым требованиям.
- [x] Удалены из левой панели яркий фиолетовый градиент, фоновая сетка, три декоративных блока и надпись demo mode.
- [x] Добавлены фон `#111820` и три угловых radial-gradient свечения с заданными rgba-значениями; заголовок и описание обновлены на требуемые тексты.
- [x] Сохранены правый блок `AuthLayout`, поля, кнопки, ссылки, toggle пароля, language/theme switch и маршрутизация без изменений.
- [x] Проверки после redesign: `npm run lint`, `npm run typecheck`, `npm run build` — успешно; dev-сервер на strict port 4189 отдаёт `HTTP 200` для `/login` и `/register`.
- [x] Незакоммиченная предыдущая работа по login сохранена отдельным коммитом `e64985a`; `authSlice.ts` переименован в `authSlice.tsx` для корректной компиляции.
- [x] Диагностика 404: `/login` открывается (`HTTP 200`), backend `/health` отдаёт `status: ok`, POST на реальный endpoint с несуществующими данными — `401`, запрос на origin Vite — `404`.
- [x] Установлена причина: отсутствовал локальный `.env`, поэтому `VITE_API_BASE_URL` был `undefined` и запрос уходил на `http://localhost:<vite-port>/api/auth/login` вместо `http://localhost:4000/api/auth/login`.
- [x] Создан локальный `.env` с публичным `VITE_API_BASE_URL=http://localhost:4000` (Git-игнорируемый, без секретов).
- [x] Удалены debug `console.log` из `LoginPage`; пользовательские ошибки остаются безопасными, токены и пароли не логируются.
- [x] Проверки после исправления: `npm run lint`, `npm run typecheck`, `npm run build` — успешно; `/login` и `/register` отдают `HTTP 200`; собранный JS содержит корректный base URL и путь логина.
- [x] Проверен `contactsApi.ts`: endpoint `GET /api/contacts`, тип `Contact` соответствует структуре из задания/Swagger; локальный Swagger-файл в репозитории отсутствует.
- [x] `ContactsPage.tsx`: удалён дублирующийся импорт `useGetContactsQuery`, добавлен `isFetching`, удалены повторяющиеся Loading/Error/Empty блоки внутри карточек.
- [x] `contacts` в `ContactsPage` поступает только из `useGetContactsQuery`; импорт и использование `@/mocks/mockData` отсутствуют.
- [x] Сохранены поиск по имени/email/телефону, Skeleton, Error State, Empty State, Retry, обновление по `isFetching` и демо-диалог Add/Edit.
- [x] Локальная проверка `npx eslint src/pages/Contacts/ContactsPage.tsx` и target `tsc` для Contacts прошли; `npx vite build` прошёл.
- [x] Полные `npm run lint`, `npm run typecheck` и `npm run build` заблокированы незакоммиченными посторонними файлами (`contactsSlice.ts`, `LoginPage.tsx`, `RegisterPage.tsx`), не изменёнными в этом этапе.
- [x] Изучены `AppShell`, `SidebarNavigation`, `PublicHeader`, `ThemeSwitcher`, auth slice/api/types, `baseApi`, `AuthInitializer`, `ProtectedRoute`, `userApi` и `main.tsx`; новая архитектура не добавлялась.
- [x] В `AppShell` сразу после ThemeSwitcher добавлен `ProfileMenu` с аватаром, именем из `state.auth.user`, стрелкой, hover/focus и компактным mobile-видом.
- [x] Dropdown на существующем shadcn/ui `DropdownMenu` показывает аватар, настоящее имя, email, разделитель, «Мой профиль» (`UserRound`) и «Выйти из аккаунта» (`LogOut`, destructive variant).
- [x] Добавлен маршрут `/profile` внутри `ProtectedRoute`; страница получает данные через `useGetMeQuery`, показывает Skeleton, Error State/Retry, имя, email, дату регистрации и аватар с первой буквой.
- [x] В `authApi` добавлена logout mutation `POST /api/auth/logout` с `LogoutRequest`; при logout refreshToken берётся из localStorage, удаляется при любом исходе, вызываются `clearCredentials()` и `baseApi.util.resetApiState()`, затем выполняется переход на `/login`.
- [x] Повторные нажатия Logout блокируются через `isBusy`; при ошибке backend показывается toast без утверждения, что токен отозван на сервере.
- [x] В `main.tsx` подключён `Toaster` из уже установленного sonner; ThemeSwitcher не изменялся.
- [x] Targeted ESLint, targeted TypeScript и `npx vite build` для профиля/логаута прошли; dev-сервер отдал `HTTP 200` для `/profile` и `/login`.
- [x] По прямому решению владельца посторонние незакоммиченные файлы с ошибками проверок не изменялись; полные lint/typecheck/build остаются заблокированными.
- [x] Проверены `OPTIONS` для `POST /api/contacts`, `PATCH /api/contacts/:id`, `DELETE /api/contacts/:id`, `GET /api/contacts/:id`, `GET /api/folders` и фильтра `folder_id` — все вернули `HTTP 204`.
- [x] В `baseApi` добавлен `tagTypes: ['Contact']`; authorization/prepareHeaders не изменены.
- [x] `contactsApi.ts` расширен endpoint’ами `getContact`, `createContact`, `updateContact`, `deleteContact` с инвалидацией Contact LIST/detail tags.
- [x] Создан `contactsSchema.ts`: RHF-совместимая Zod-схема name/phone/email/note с локализованными сообщениями через `createContactSchema(t)`.
- [x] `ContactsPage` заменил DemoActionDialog на реальные Add/Edit формы на RHF + Zod + `Field`; добавлен AlertDialog удаления, toast успеха/ошибок, note в карточке и локализация всех текстов ru/tj/en.
- [x] Реальные POST/PATCH/DELETE не выполнялись без подготовленных тестовых данных и разрешения владельца.
- [x] Targeted ESLint, target TypeScript, `npx vite build` и dev-проверка `/contacts` — успешно; полные проверки остаются заблокированными посторонними файлами.

## In Progress

Нет активных задач.

## Pending

- [ ] Изучить контракты остальных ресурсов backend и механизм авторизации/storage токенов.
- [ ] Уточнить формат identifier и состав полей для Register (в Login уже используется email).
- [ ] Добавить остальные типы и endpoint’ы через `baseApi.injectEndpoints` только после изучения backend.
- [ ] Определить реальные `tagTypes` и правила инвалидации кэша.
- [ ] Уточнить реальные поля и правила форм для долгов, контактов, папок, платежей, пользователей и архива.
- [ ] Добавить формы (React Hook Form + Zod) и валидацию для реальных операций после появления контрактов backend.
- [ ] Заменить демо-диалоги и заглушки фильтров на реальные сценарии после изучения backend.
- [ ] Проверить визуальное соответствие PNG-макетам в окружении с поддержкой просмотра изображений.
- [ ] Провести браузерную проверку адаптивности, навигации и консоли, если станет доступен браузер.
- [ ] Вручную проверить dropdown по Escape/outside click и фокусу клавиатуры с реальной сессией.
- [ ] Вручную проверить logout с валидным refreshToken, повторный login и восстановление сессии после перезагрузки.
- [ ] Оптимизировать размер JS-чанка (Recharts/страницы) при необходимости.
- [ ] Настроить тесты, если будет принято решение о тестовом фреймворке.

## Вопросы владельцу

- Каков точный состав полей и формат payload для создания и редактирования долгов, контактов, папок, платежей и пользователей? Сейчас в `DemoActionDialog` используются нейтральные поля `Параметр 01–03` и отключённое сохранение.
- Что именно означает identifier в реальной системе (email, телефон, логин или другой формат)? Пока страницы входа и регистрации используют нейтральную подпись и отключённые кнопки.
- Какие действия с архивом считаются допустимыми после подключения backend: только просмотр, восстановление, удаление или другое?
- Нужно ли включать `ADL58_V2_Designs/` и `ADL58_V2_Premium_Fintech_Images.zip` в Git, или макеты остаются локальным источником дизайна?

## Правила

- Не начинать Pending-задачи без явной просьбы.
- Не отмечать задачу Completed без запуска соответствующей проверки.
- После завершения этапа обновить `DEVELOPMENT_LOG.md` и `PROJECT_CONTEXT.md`.

## Этап 3 — Debts CRUD, 2026-11-21

- [x] Реальные getDebts/getDebtById/addDebt/updateDebt/deleteDebt через baseApi.injectEndpoints, простые Debt/Dashboard tags и backend-фильтры.
- [x] DebtsPage: RHF/Zod, setValue без useEffect, реальные контакты, просмотр, подтверждение удаления, loading/error/empty/pending, RU/TJ/EN.
- [x] Сверен контракт backend; статусы/платежи/валютные итоги не вычисляются на frontend; пустые даты не отправляются.
- [x] Целевые TypeScript/ESLint, изолированные проверки схемы/RTK Query, Vite build и dev-маршруты прошли.
- [ ] Полные TypeScript/lint/build: устранение прежних ошибок contactsSlice/auth/Contacts — отдельная задача, чужие изменения сохранены.
- [ ] Проверить авторизованный Debts/Contacts/Folders CRUD и браузерную работу с тестовой сессией. Сейчас защищённые GET возвращают 401 без токена.
- [ ] Отдельно исправить прежнюю форму Contacts: обязательный folder_id схемы отсутствует в форме.

## Этап 5 — Payments, 2026-11-21

- [x] GET истории и POST платежа через baseApi.injectEndpoints с фактическим ответом {payment,debt}, простыми Payment/Debt/Dashboard tags.
- [x] История и RHF/Zod-форма в просмотре долга: реальный debtId, загрузка по раскрытию, loading/error/retry/empty, блокировка повторной отправки, сохранение ввода при ошибке.
- [x] RU/TJ/EN; ISO paid_at из локального времени; валюта только из долга, не отправляется в POST; ручных финансовых вычислений нет.
- [x] /payments направляет к выбору долга, моковые платежи и несуществующие edit/delete действия удалены.
- [x] Целевые TypeScript/ESLint, изолированные schema/API/service tests, регрессия Debts, Vite build и dev smoke прошли.
- [ ] Полные TypeScript/lint/build: прежние ошибки auth/Contacts исправить отдельной задачей.
- [ ] Проверить диалоги и авторизованные платежи на тестовых долгах с реальным backend. Сейчас проверен код сервиса в изоляции; реальные финансовые записи не менялись.
- [ ] При необходимости отдельно согласовать backend-правило обратного долга при переплате: текущий сервер просто устанавливает paid.
- [x] Повторно проверены существующие Payments, интеграция Debts/Dashboard, схема, RU/TJ/EN, payloads, ответ {payment,debt}, ошибка 422 без повторного POST и refetch всех четырёх queries; подтверждённых проблем для переписывания нет.
- [x] Повторные целевые TypeScript/ESLint, регрессия Debts, Vite build и smoke /debts и /payments прошли; полные проверки фиксируют прежние 8 TypeScript и 6 ESLint ошибок auth/Contacts.
- [x] Подготовлен отдельный коммит feat: implement debt payments; посторонние auth/Contacts/Folders/Dashboard/design assets, Folder tag и заголовок Dashboard исключены. Push не выполняется; следующий этап не начинается.

## Phase 6 — Dashboard, 2026-11-21

- [x] Изучен и сохранён исходный незакоммиченный Dashboard; контракт summary сверен с backend SQL/OpenAPI без изменений backend.
- [x] GET /api/dashboard/summary через существующий baseApi.injectEndpoints, простой Dashboard tag в endpoint; временный enhanceEndpoints из main.tsx удалён.
- [x] Реальные total/pending/partial/paid, contacts_count и список до 10 непогашенных долгов со сроками и исходными валютами. Реальное распределение по статусам вместо мокового временного ряда.
- [x] Три денежные карточки сохранены с пояснением недоступности: агрегаты смешивают валюты без группировки, frontend не отображает их как достоверные суммы и не рассчитывает замену.
- [x] Loading/error/retry/empty/partial-data, ручное обновление, RU/TJ/EN. Плавающая кнопка ведёт в реальные /debts, без демо-формы.
- [x] Изолированно проверены refetch после add/update/deleteDebt и addPayment, удаление неактивного кэша, повторный вход, Authorization и 401/retry. Серверные данные не копируются в useState/slice.
- [x] Целевые TypeScript/ESLint, SSR всех языков/состояний, регрессия Debts/Payments, Vite build и dev smoke прошли. Прежние полные проверки: 8 ошибок TypeScript и 6 ESLint auth/Contacts, новых ошибок нет.
- [ ] Авторизованный GET summary и реальные mutation-сценарии на подготовленных тестовых данных; сейчас живой GET без токена возвращает 401.
- [ ] Визуально проверить мобильный/desktop Dashboard и Light/Dark в браузере: browser host недоступен, native Chrome отклонил ввод из-за активности пользователя. SSR не заменяет визуальный осмотр.
- [ ] Отдельная задача backend при необходимости: предоставить агрегаты с группировкой по валютам; текущий frontend не меняет финансовый контракт.
