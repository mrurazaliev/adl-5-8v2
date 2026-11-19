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

## In Progress

Нет активных задач.

## Pending

- [ ] Изучить реальные запросы/ответы backend и механизм авторизации.
- [ ] Уточнить точный формат нейтрального identifier и состав полей регистрации.
- [ ] Уточнить значение `VITE_API_BASE_URL` в локальном `.env` (без записи секретов в репозиторий).
- [ ] Добавить типы и endpoint’ы через `baseApi.injectEndpoints` только после изучения backend.
- [ ] Определить реальные `tagTypes` и правила инвалидации кэша.
- [ ] Уточнить реальные поля и правила форм для долгов, контактов, папок, платежей, пользователей и архива.
- [ ] Добавить формы (React Hook Form + Zod) и валидацию для реальных операций после появления контрактов backend.
- [ ] Заменить демо-диалоги и заглушки фильтров на реальные сценарии после изучения backend.
- [ ] Проверить визуальное соответствие PNG-макетам в окружении с поддержкой просмотра изображений.
- [ ] Провести браузерную проверку адаптивности, навигации и консоли, если станет доступен браузер.
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
