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

## In Progress

Нет активных задач.

## Pending

- [ ] Изучить реальные запросы/ответы backend и механизм авторизации.
- [ ] Уточнить значение `VITE_API_BASE_URL` в локальном `.env` (без записи секретов в репозиторий).
- [ ] Добавить типы и endpoint’ы через `baseApi.injectEndpoints` только после изучения backend.
- [ ] Определить реальные `tagTypes` и правила инвалидации кэша.
- [ ] Подготовить каркас layout/navigation для разделов Dashboard, Debts, Contacts, Folders, Payments, Users, Archive.
- [ ] Реализовать страницы разделов по одному, без моковых данных.
- [ ] Добавить формы (React Hook Form + Zod) и валидацию для реальных операций.
- [ ] Добавить графики Recharts и расширения i18n по мере появления экранов.
- [ ] Расширить переводы для новых разделов.
- [ ] Настроить тесты, если будет принято решение о тестовом фреймворке.

## Правила

- Не начинать Pending-задачи без явной просьбы.
- Не отмечать задачу Completed без запуска соответствующей проверки.
- После завершения этапа обновить `DEVELOPMENT_LOG.md` и `PROJECT_CONTEXT.md`.
