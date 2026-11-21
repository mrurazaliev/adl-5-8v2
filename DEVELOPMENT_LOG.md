# DEVELOPMENT_LOG.md — ADL58 V2

Журнал разработки. Новые записи добавляются в конец файла, старые решения не удаляются.

## 2026-11-19 — Инициализация проекта и выбор стека

### Что реализовано

- Проверена текущая директория: проект отсутствовал, создан Vite React + TypeScript непосредственно в корне.
- Проверены версии Node.js (`24.15.0`) и npm (`11.12.1`), совместимость с Vite 8 подтверждена.
- Установлены зависимости и сформированы скрипты `dev`, `build`, `typecheck`, `lint`, `preview`.
- После уточнения требований стек приведён к Redux Toolkit + RTK Query + react-router-dom; Zustand, TanStack Query и Axios удалены.

### Изменённые файлы

- `package.json`, `package-lock.json`.
- `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`.
- `.env.example`, `.gitignore`, `index.html`.

### Проблемы

- Шаблон Vite 8 содержит TypeScript 7, но `typescript-eslint 8` поддерживает TypeScript только `<6.1`.
- Первоначально был установлен `react-router` 8, затем финальной инструкцией потребован `react-router-dom`.

### Решения

- TypeScript зафиксирован на `~5.9.3`.
- Используется `react-router-dom@7.18.6` как актуальная версия пакета с требуемым названием.
- Отдельный Redux Thunk не устанавливался; используется встроенный middleware Redux Toolkit.

### Результаты проверок

- `npm install` — успешно.
- `npm ls --depth=0` — показывает ожидаемые пакеты, без запрещённых.

### Далее

- Настроить Tailwind CSS v4, ESLint и shadcn/ui.

---

## 2026-11-19 — Tailwind CSS v4, ESLint и shadcn/ui

### Что реализовано

- Подключён официальный Vite Plugin `@tailwindcss/vite`.
- Настроен alias `@/* → src/*` для Vite и TypeScript.
- ESLint 10 заменил Oxlint из шаблона, `.oxlintrc.json` удалён.
- shadcn/ui инициализирован официальным CLI с базой `radix` и preset `nova`.
- Установлены Button, Card, Input, Label, Dialog, Alert Dialog, Dropdown Menu, Select, Table, Badge, Skeleton, Tabs, Sheet, Separator, Tooltip, Avatar и Field.

### Изменённые файлы

- `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`.
- `eslint.config.js`, `components.json`.
- `src/components/ui/*.tsx`, `src/lib/utils.ts`.

### Проблемы

- CLI shadcn требовал выбор preset при неинтерактивном запуске.
- CLI не смог найти Tailwind до добавления `@import "tailwindcss"` в глобальный CSS.
- Компонент `form` отсутствует в актуальном registry shadcn.
- Сгенерированные компоненты импортировали сервисный пакет `cn`, а не локальный `@/lib/utils`.

### Решения

- Использован `npx shadcn@latest init -b radix -p nova -y`.
- Перед повторным init в CSS добавлен `@import "tailwindcss"`.
- Вместо `form` добавлен официальный компонент `Field` (`npx shadcn@latest add field`).
- Импорты `from "cn"` заменены на `from '@/lib/utils'`, где `cn` реализован через `clsx` + `tailwind-merge`.
- Для сгенерированных UI-файлов отключено правило `react-refresh/only-export-components`, так как shadcn экспортирует варианты вместе с компонентами.

### Результаты проверок

- `npm run lint` — 0 ошибок, 0 предупреждений.
- `npm run typecheck` — 0 ошибок.
- Сборка CSS содержала Tailwind-утилиты (`bg-background`, `text-3xl`) и бренд-цвета.

### Далее

- Создать Redux store, RTK Query base API, i18n и стартовый интерфейс.

---

## 2026-11-19 — Redux, RTK Query и стартовое приложение

### Что реализовано

- `src/app/store.ts`: `configureStore`, редьюсеры `ui` и `api`, `baseApi.middleware`, DevTools только в DEV.
- `src/app/hooks.ts`: `useAppDispatch` и `useAppSelector` через `withTypes`.
- `src/features/ui/uiSlice.ts`: тема и состояние sidebar с четырьмя actions.
- `src/api/baseApi.ts`: `createApi` + `fetchBaseQuery`, базовый URL из `VITE_API_BASE_URL`, пустые endpoints, без tagTypes.
- `src/main.tsx`: `Provider`, `BrowserRouter`, `Routes`, `TooltipProvider`, `Toaster`, единственный маршрут `/`.
- `src/App.tsx`: стартовый экран с заголовком ADL58 V2, Card, Button и переключением темы.
- `src/i18n/index.ts`: ru/tj/en, русский по умолчанию, минимальные ключи.
- `src/styles/index.css`: Premium Fintech токены, светлая и тёмная темы, Geist, единые radius/spacing.

### Изменённые файлы

- `src/app/store.ts`, `src/app/hooks.ts`, `src/features/ui/uiSlice.ts`.
- `src/api/baseApi.ts`, `src/vite-env.d.ts`.
- `src/main.tsx`, `src/App.tsx`, `src/i18n/index.ts`, `src/styles/index.css`.
- `src/components/ui/tooltip.tsx` используется через `TooltipProvider` в точке входа.

### Проблемы

- Endpoint’ы backend неизвестны, поэтому реальные запросы и типы не добавлялись.
- Механизм авторизации backend не изучался.

### Решения

- Endpoint’ы оставлены пустыми; вся будущая серверная логика должна подключаться через `injectEndpoints`.
- Демонстрационные данные не создавались.

### Результаты проверок

- `npm run typecheck` — 0 ошибок.
- `npm run build` — успешно, 172 модуля.
- `npm run dev` — Vite поднялся, HTML отдан через `curl`.
- `npm audit --audit-level=moderate` — 0 уязвимостей.

### Далее

- Зафиксировать итоговую проверку и подготовить документы восстановления контекста.

---

## 2026-11-19 — Очистка зависимостей и финальная проверка

### Что реализовано

- Выполнено официальное `shadcn eject`: CSS-утилиты встроены в `src/styles/index.css`, runtime-пакет `shadcn` удалён.
- Импорт Geist перенесён в начало CSS после eject (CSS `@import` должен идти до правил).
- Сборка `dist/` оставлена как артефакт проверки, в Git игнорируется.

### Изменённые файлы

- `src/styles/index.css`, `package.json`, `package-lock.json`.

### Проблемы

- `npm audit` показывал 4 moderate-уязвимости через `shadcn → ts-morph → minimatch`.

### Решения

- Применён официальный `npx shadcn@latest eject -y`; после `npm install` аудит чистый.
- Зафиксировано ограничение: будущие обновления `shadcn/tailwind.css` не применяются автоматически.

### Результаты проверок

- `npm run lint` — успешно.
- `npm run typecheck` — успешно.
- `npm run build` — успешно.
- `npm audit --audit-level=moderate` — `found 0 vulnerabilities`.
- Tailwind-классы и бренд-цвета присутствуют в собранном CSS.

### Далее

- Создать документы постоянного контекста и передать проект следующей сессии.

---

## 2026-11-19 — Система постоянного контекста

### Что реализовано

- Созданы `AGENTS.md`, `PROJECT_CONTEXT.md`, `TASKS.md` и `DEVELOPMENT_LOG.md`.
- Зафиксированы startup-протокол, стек, архитектурные правила, state/API-правила и дизайн-система.
- Зафиксированы фактическое состояние проекта, принятые решения, ограничения backend и список этапов.

### Изменённые файлы

- `AGENTS.md`, `PROJECT_CONTEXT.md`, `TASKS.md`, `DEVELOPMENT_LOG.md`.

### Проблемы

- Новых технических проблем на этом этапе не обнаружено.

### Решения

- Документы созданы как единственный источник восстановления контекста; `README.md` оставлен без изменений как устаревший шаблонный файл.

### Результаты проверок

- Наличие всех четырёх файлов проверено командой `ls`.

### Далее

- Следующая сессия должна начать с чтения `PROJECT_CONTEXT.md`, `TASKS.md` и последней записи `DEVELOPMENT_LOG.md`.
- Новые функции не начинать без явной просьбы.

---

## 2026-11-19 — Восстановление контекста и конфигурация OpenCode

### Что реализовано

- Обновлён стартовый протокол: добавлены чтение `CODING_STYLE.md`, проверка `git status --short`, `git log --oneline -10` и сравнение документов с кодом.
- Зафиксированы правила React Hook Form + Zod, границы бизнес-логики и требование останавливаться перед бизнес-решениями.
- Исправлены неточности в `AGENTS.md` (`-clsx`, опечатки в новых формулировках) и `CODING_STYLE.md` (`Типизаformы`, разорванная строка `Controller`).
- Создан project-level `opencode.jsonc` с автоматической фоновой компакцией, сохранением `15000` токенов и буфером `20%`.
- Обновлены `PROJECT_CONTEXT.md`, `TASKS.md`: отражены Git-репозиторий, начальный коммит, созданные документы и новая конфигурация OpenCode.

### Изменённые файлы

- `AGENTS.md`, `CODING_STYLE.md`, `PROJECT_CONTEXT.md`, `TASKS.md`, `DEVELOPMENT_LOG.md`.
- `opencode.jsonc`.

### Проблемы

- Project-level конфигурация OpenCode отсутствовала; глобальный `~/.config/opencode/opencode.jsonc` содержал только `$schema`.
- Документы после инициализации Git устарели: `PROJECT_CONTEXT.md` ещё сообщал об отсутствии репозитория, а `TASKS.md` держал созданные файлы контекста in progress.
- Требовалось подтвердить точную форму полей `compaction` по официальной JSON-схеме, так как OpenCode строго проверяет конфигурацию.

### Решения

- Создан отдельный project-level `opencode.jsonc`; глобальная конфигурация (model/provider/API keys) не изменялась.
- По схеме `https://opencode.ai/config.json` подтверждено: `auto` и `background` — boolean, `keep.tokens` — integer, `buffer` допускает строку процента `"20%"`, `compaction.additionalProperties: false`.
- После изменения конфигурации OpenCode требуется перезапуск CLI; текущая сессия продолжает работать со старой загруженной конфигурацией.
- Начальный коммит зафиксирован как `d9a690a694345fbdf41169cdcb76a594e26ef694`; push не выполнялся.

### Результаты проверок

- `node -e "JSON.parse(...)"` для `opencode.jsonc` — файл является корректным JSON.
- `npm run lint` — успешно.
- `npm run typecheck` — успешно.
- `npm run build` — успешно, 172 модуля.
- `git status --short` — изменения не в индексе только для файлов этого этапа.

### Далее

- Создать коммит с изменениями текущего этапа и сообщить владельцу хеш коммита.
- Новые функции и бизнес-логику не начинать без явной просьбы.

---

## 2026-11-19 — Проверка завершённой настройки контекста

### Что проверено

- Содержимое `AGENTS.md`, `PROJECT_CONTEXT.md`, `CODING_STYLE.md` и `opencode.jsonc` соответствует фактическому состоянию проекта; расхождений не найдено.
- Стартовый протокол, правила постоянного контекста, границы бизнес-логики и Git-правила сохранены.
- Фактическое состояние Git перед началом проверки: рабочее дерево чистое, HEAD — `b1a21acd71103fcb5a43791e5d37a045b4e3c9b3` (`docs: configure context recovery and opencode compaction`).

### Изменённые файлы

- `TASKS.md`, `DEVELOPMENT_LOG.md`.

### Проблемы

- Первый вариант shell-проверки `opencode.jsonc` потерял `$schema` из-за интерполяции в двойных кавычках; в файле ошибки не было. Повторная проверка с экранированием прошла успешно.

### Решения

- Конфигурацию OpenCode и файлы постоянного контекста оставить без изменений: исправлений не требовалось.
- В текущей задаче зафиксированы только результаты проверки и итог проверки в `TASKS.md` и `DEVELOPMENT_LOG.md`; новые задачи и push не выполняются.

### Результаты проверок

- По свежей официальной JSON-схеме `https://opencode.ai/config.json`: `$schema`, `compaction`, `auto`, `background`, `keep`, `tokens` и `buffer` поддерживаются и не помечены устаревшими; `root.additionalProperties: false`, `compaction.additionalProperties: false`, `keep.additionalProperties: false`.
- `"20%"` соответствует шаблону `Config.Compaction.Percent`; `15000` допустимо для `keep.tokens`.
- Встроенная проверка `opencode.jsonc` — корректный JSON, ожидаемые ключи и значения.
- `npm run lint` — успешно.
- `npm run typecheck` — успешно.
- `npm run build` — успешно, 172 модуля.
- `git diff --check` — без ошибок.

### Далее

- Создать коммит только с изменениями `TASKS.md` и `DEVELOPMENT_LOG.md` и сообщить SHA владельцу.
- Новые функции и бизнес-логику не начинать без явной просьбы.

---

## 2026-11-19 — Визуальный UI всех разделов ADL58 V2

### Что реализовано

- Создан единый layout: `AppShell` с desktop sidebar, мобильным `Sheet`, header с кнопкой меню, переключателем темы и выбором языка.
- Создан `SidebarNavigation` с активным state через `NavLink`; профиль и рекламные блоки не добавлены.
- В `src/main.tsx` объявлены маршруты `/`, `/debts`, `/contacts`, `/folders`, `/payments`, `/users`, `/archive` и fallback на `/`.
- Реализованы страницы: Dashboard (карточки, AreaChart, PieChart, таблица, быстрые действия), Debts (карточки, поиск, фильтры, вкладки, таблица, модалки), Contacts (карточки контактов, фильтры, модалки), Folders (карточки категорий, создание/управление), Payments (карточки, таблица, вкладки, просмотр/редактирование), Users (роли, статусы, таблица), Archive (таблица, действия, состояние пустого списка).
- Добавлены shared-компоненты `PageHeader`, `StatCard`, `StatusBadge`, `FilterBar`, `DemoActionDialog`, `EmptyState`.
- Добавлены статические UI-данные только в `src/mocks/mockData.ts`.
- Расширены переводы i18n для навигации, страниц и common-действий.

### Изменённые файлы

- `src/main.tsx`, `src/App.tsx`, `src/i18n/index.ts`.
- `src/components/layout/AppShell.tsx`, `src/components/layout/SidebarNavigation.tsx`.
- `src/components/shared/PageHeader.tsx`, `src/components/shared/StatCard.tsx`, `src/components/shared/StatusBadge.tsx`, `src/components/shared/FilterBar.tsx`, `src/components/shared/DemoActionDialog.tsx`, `src/components/shared/EmptyState.tsx`.
- `src/mocks/mockData.ts`.
- `src/pages/*/*.tsx` — семь страниц разделов.
- `PROJECT_CONTEXT.md`, `TASKS.md`, `DEVELOPMENT_LOG.md`.

### Проблемы

- Встроенный image reader не смог прочитать PNG-макеты: `File format not supported by image reader`.
- OCR-инструменты недоступны: `tesseract` не найден, `pytesseract` и `PIL` отсутствуют.
- Каталог `design-references/` отсутствует; макеты находятся в `ADL58_V2_Designs/`.
- Первый прогон `typecheck` нашёл три обращения к несуществующим полям mock-строк: `ArchiveRow.name`, `ArchiveRow.date`, `UserRow.phone`.
- Сборка выдаёт предупреждение Vite о размере JS-чанка (~966 kB).

### Решения

- UI сверялся с `ADL58_V2_Designs/README.txt` и текстовыми требованиями задачи; расхождение зафиксировано в документах.
- Ошибки типов исправлены: используются реальные поля `ArchiveRow.title`, `ArchiveRow.archivedAt` и `UserRow.lastActive`.
- Все действия, требующие backend, оставлены как демо: модалки открываются, сохранение отключено, фильтры и search не изменяют данные.
- Временные данные размещены только в `src/mocks/mockData.ts`; mock API, мутации, CRUD и финансовые расчёты не добавлены.
- Точный состав полей форм и вопросы по архиву/макетам вынесены в `TASKS.md`.
- `ADL58_V2_Designs/` и `ADL58_V2_Premium_Fintech_Images.zip` оставлены неотслеживаемыми: включение дизайн-макетов в Git требует решения владельца.

### Результаты проверок

- `npm run lint` — успешно.
- `npm run typecheck` — успешно.
- `npm run build` — успешно, 2686 модулей, только warning о размере чанка.
- Браузерная проверка адаптивности и консоли в текущем окружении не выполнялась.

### Далее

- Создать коммит с изменениями UI-этапа и сообщить SHA владельцу.
- После получения контрактов backend заменить демо-диалоги на RHF + Zod компоненты.
- Проверить визуальное соответствие макетам в окружении с поддержкой просмотра изображений.

---

## 2026-11-19 — Проверка и завершение UI-этапа после ECONNRESET

### Что проверено

- Повторно прочитаны `AGENTS.md`, `PROJECT_CONTEXT.md`, `CODING_STYLE.md`, `TASKS.md` и последняя запись `DEVELOPMENT_LOG.md`.
- `git status --short` подтвердил: изменения только в документах, `src/App.tsx`, `src/i18n/index.ts`, `src/main.tsx` и новых каталогах `src/components/layout`, `src/components/shared`, `src/mocks`, `src/pages`.
- Прочитаны и сверены все файлы UI-этапа: entry point, layout, shared components, mock data, i18n и семь страниц.
- Подтверждено наличие всех страниц: Dashboard, Debts, Contacts, Folders, Payments, Users, Archive.
- Подтверждены маршруты `/`, `/debts`, `/contacts`, `/folders`, `/payments`, `/users`, `/archive` и fallback `*` → `/`; пункты `SidebarNavigation` соответствуют маршрутам.
- Grep по страницам не нашёл `fetch`, `axios`, `useMutation`, `injectEndpoints` и HTTP-методов.

### Изменённые файлы

- `TASKS.md`, `PROJECT_CONTEXT.md`, `DEVELOPMENT_LOG.md`.

### Проблемы

- Готовые компоненты не требовали переписывания; незавершённых UI-файлов не обнаружено.
- Браузерная проверка недоступна, визуальное сравнение с PNG-макетами остаётся открытым вопросом.
- Vite по-прежнему предупреждает о размере JS-чанка (~966 kB).

### Решения

- Изменения ограничены финальной верификацией и обновлением документации.
- Коммит создаётся только с исходным кодом и документацией текущего этапа; `ADL58_V2_Designs/` и ZIP-архив не добавляются.
- Push и следующий этап не выполняются.

### Результаты проверок

- `npm run lint` — успешно.
- `npm run typecheck` — успешно.
- `npm run build` — успешно, 2686 модулей, только warning о размере чанка.
- `git diff --check` — без ошибок.

### Далее

- Отчитаться о результатах и передать SHA коммита.
- Не начинать backend/CRUD/RHF+Zod этап без отдельного разрешения.

---

## 2026-11-19 — Уточнение Dashboard по требованиям владельца

### Что реализовано

- Удалены donut chart и блок Quick Actions только со страницы Dashboard.
- Вместо четырёх карточек добавлены три: «Общий итог», «Мне должны», «Я должен».
- AreaChart из Recharts и список «Последние платежи» размещены в одной сетке `2fr / 1fr` на desktop и вертикально на мобильных.
- Добавлен `DebtActionFab`: плавающая кнопка `Plus`, раскрытие двух демо-действий, закрытие по outside click и Escape, `aria-label`, `aria-expanded`, `aria-controls`, `aria-hidden`, `tabIndex` и анимации с учётом `motion-reduce`.
- `DemoActionDialog` получил опциональный `saveLabel`; в новых Dashboard-диалогах кнопка «Сохранить» остаётся disabled.
- Обновлены демонстрационные `dashboardStats` и i18n-ключи для ru/tj/en.

### Изменённые файлы

- `src/pages/Dashboard/DashboardPage.tsx`.
- `src/components/shared/DebtActionFab.tsx`.
- `src/components/shared/DemoActionDialog.tsx`.
- `src/mocks/mockData.ts`, `src/i18n/index.ts`.
- `PROJECT_CONTEXT.md`, `TASKS.md`, `DEVELOPMENT_LOG.md`.

### Проблемы

- Текущая модель не отображает содержимое PNG, поэтому визуальное сравнение с `01_Dashboard_FINAL.png` недоступно.
- Точный состав полей форм долга неизвестен; использованы нейтральные поля `Параметр 01–03` из существующего демо-диалога.
- Браузерная визуальная проверка адаптивности и консоли по-прежнему недоступна.
- Vite предупреждает о размере JS-чанка (~990 kB) из-за Recharts и общего bundle.

### Решения

- Изменения ограничены Dashboard и минимально необходимыми shared/mock/i18n-файлами; Sidebar, Header, store, RTK Query, routes и другие страницы не трогались.
- Статические значения остались в `src/mocks/mockData.ts`; API, CRUD, мутации, расчёты и сохранение не добавлены.
- Donut-specific данные `paymentDistribution` оставлены в mock-файле как неиспользуемый экспорт, чтобы не затрагивать другие разделы.
- Дизайн-каталог `ADL58_V2_Designs/` и ZIP остаются неотслеживаемыми до решения владельца.

### Результаты проверок

- `npm run lint` — успешно.
- `npm run typecheck` — успешно.
- `npm run build` — успешно, 2692 модуля, только warning о размере чанка.
- `npm run dev` — главная страница отдала `HTTP 200`.
- `git diff --check` — без ошибок; Git вывел только предупреждения о конвертации LF → CRLF.

### Далее

- Создать отдельный коммит с изменениями текущего этапа и сообщить SHA владельцу.
- При необходимости уточнить реальные поля форм долга и провести визуальную проверку в окружении с поддержкой изображений/браузера.

---

## 2026-11-19 — Скрытие статуса долга в списке Debts

### Что реализовано

- Из таблицы на странице Debts удалена колонка «Статус» и статусные `StatusBadge` в строках.
- Ширины оставшихся колонок заданы явно: ID, Должник, Папка, Сумма, Срок и Действия.
- Остальные поля, кнопки, действия, фильтры по статусу и вкладки сохранены без изменений.
- Поле `status` осталось в `DebtRow` и демонстрационных данных.

### Изменённые файлы

- `src/pages/Debts/DebtsPage.tsx`.
- `PROJECT_CONTEXT.md`, `TASKS.md`, `DEVELOPMENT_LOG.md`.

### Проблемы

- Новых технических проблем не обнаружено.

### Решения

- Изменение выполнено исключительно на уровне отображения: бизнес-логика, фильтрация и структура данных не трогались.
- Другие страницы и общие компоненты не изменялись.

### Результаты проверок

- `npm run lint` — успешно.
- `npm run typecheck` — успешно.
- `npm run build` — успешно, 2692 модуля, только warning о размере чанка.

### Далее

- Включить изменения текущего UI-этапа в коммит без push и сообщить SHA владельцу.

---

## 2026-11-19 — Финальный UI-обзор перед backend

### Что проверено

- Dashboard: круговой график и Quick Actions отсутствуют, AreaChart сохранён, «Последние платежи» размещены рядом с графиком, FAB открывает два демо-диалога, кнопки сохранения отключены.
- Debts: колонка и бейджи статуса отсутствуют, остальные колонки имеют заданные ширины, таблица прокручивается по горизонтали на узких экранах.
- Contacts, Folders, Payments, Users, Archive: визуальная структура, карточки, таблицы, фильтры и демо-диалоги проверены без изменений бизнес-логики.
- Формы: демо-диалоги используют shadcn `Field`/`FieldGroup`, нейтральные отключённые поля и не выполняют валидацию или отправку.
- Адаптивность: проанализированы контрольные ширины 375, 768, 1024 и 1440px по breakpoint-классам и структуре контейнеров.

### Обнаруженные ошибки

- На ширине 375px длинные подписи вкладок в Debts и Payments могли выходить за границы контейнера и вызывать горизонтальное переполнение страницы.
- В Archive контейнер вкладок не был защищён от переполнения при узкой ширине.
- `DemoActionDialog` не имел точки расширения для будущих управляемых полей RHF + Zod.

### Что исправлено

- `TabsList` в Debts, Payments и Archive обёрнут в `max-w-full overflow-x-auto` с утилитой `no-scrollbar`.
- `DemoActionDialog` получил опциональный `children`: при наличии потомков они заменяют нейтральные демо-поля внутри `FieldGroup`.
- Исправлена опечатка отступа в структуре каталога `PROJECT_CONTEXT.md`.

### Изменённые файлы

- `src/pages/Debts/DebtsPage.tsx`, `src/pages/Payments/PaymentsPage.tsx`, `src/pages/Archive/ArchivePage.tsx`.
- `src/components/shared/DemoActionDialog.tsx`.
- `PROJECT_CONTEXT.md`, `TASKS.md`, `DEVELOPMENT_LOG.md`.

### Проблемы

- Браузерная визуальная проверка недоступна: в окружении нет Playwright, Puppeteer, Chromium, Chrome или Edge.
- Vite по-прежнему предупреждает о размере JS-чанка (~990 kB).
- PNG-макеты не могут быть визуально восприняты текущей моделью.

### Решения

- Адаптивность проверена статически по классам Tailwind и через dev-сервер; реальный screenshot comparison остаётся задачей окружения с браузером.
- API endpoints, валидация, отправка форм и бизнес-логика не добавлялись.
- Изменения ограничены визуальной структурой и подготовкой компонента диалога.

### Результаты проверок

- `npm run lint` — успешно.
- `npm run typecheck` — успешно.
- `npm run build` — успешно, 2692 модуля, только warning о размере чанка.
- `npm run dev` — маршруты `/`, `/debts`, `/contacts`, `/folders`, `/payments`, `/users`, `/archive` и `/unknown` отдают `HTTP 200`; лог Vite без ошибок.
- Grep подтвердил отсутствие `PieChart`, Quick Actions, `StatusBadge` в Debts и HTTP-запросов/API-мутаций в исходниках.

### Далее

- Создать коммит финального UI-обзора без push и сообщить SHA владельцу.
- После получения контрактов backend перейти к RHF + Zod формам и реальным endpoint’ам через `baseApi.injectEndpoints`.

---

## 2026-11-19 — Публичные страницы Landing, Login и Register

### Цель

Добавить публичную главную в Premium Fintech стиле и статичные страницы входа/регистрации, не затрагивая backend, бизнес-логику и данные внутренних разделов.

### Что сделано

- Изучены обязательные документы, `git status`, ветка `master`, HEAD `bb646da`, структура `src/`, маршруты, store, `uiSlice`, `i18n` и CSS-токены.
- Публичный сайт `https://www.adl5-8.tj/` запрошен через webfetch: получена только SPA-оболочка с meta-описанием; JS-контент не отображается без браузера.
- Созданы `PublicLayout`, `PublicHeader`, `AuthLayout`, `LandingPage`, `LoginPage`, `RegisterPage`.
- `PublicHeader` содержит логотип, RU/TJ/EN, переключатель Light/Dark и ссылки-кнопки на `/login` и `/register`; на узких экранах кнопки переносятся во вторую строку.
- `LandingPage` получил точные тексты Hero, градиентную вторую строку заголовка, сетку, мягкие фиолетовые свечения с `motion-safe`, три карточки возможностей и минимальный footer. Обе CTA-кнопки ведут на `/register`.
- `AuthLayout` реализован без Sidebar: на desktop слева градиентная колонка с логотипом, заголовком, описанием и декоративными финансовыми элементами, справа — содержимое формы.
- Login и Register используют нейтральный identifier, пароль с show/hide toggle, подтверждение пароля в registration, отключённые кнопки отправки и перекрёстные ссылки.
- Dashboard перенесён с `/` на `/dashboard`; остальные внутренние разделы сохранили исходные пути; в `SidebarNavigation` обновлён только путь Dashboard.
- Добавлены переводы `landing.*` и `auth.*` для ru/tj/en без изменения языка по умолчанию.

### Изменённые файлы

- `src/main.tsx`, `src/components/layout/SidebarNavigation.tsx`, `src/i18n/index.ts`.
- Новые: `src/components/layout/PublicLayout.tsx`, `src/components/layout/PublicHeader.tsx`, `src/components/layout/AuthLayout.tsx`, `src/pages/Public/LandingPage.tsx`, `src/pages/Auth/LoginPage.tsx`, `src/pages/Auth/RegisterPage.tsx`.
- `PROJECT_CONTEXT.md`, `TASKS.md`, `DEVELOPMENT_LOG.md`.

### Проблемы

- Браузер, Playwright/Puppeteer и JS-рендер для `https://www.adl5-8.tj/` недоступны; визуальное сравнение с реальным сайтом не выполнялось.
- Скриншот/reference-изображение в сообщении задачи отсутствует; доступные локальные PNG относятся к внутренним экранам прошлого этапа.
- Vite по-прежнему предупреждает о размере JS-чанка (~1013 kB).
- Порт 4173 был занят сторонним процессом, поэтому итоговая проверка маршрутов выполнена на `4188 --strictPort`.
- При первой сборке маршрутов внутренние разделы оказались вложенными под `/dashboard`; это противоречило требованию сохранить исходные пути и было исправлено до повторных проверок.

### Решения

- Дизайн выполнен по текстовым требованиям владельца и зафиксированным CSS-токенам; невидимые разделы сайта не выдумывались.
- Публичные страницы отделены от внутреннего `AppShell`; общий Redux `uiSlice` и i18next переиспользованы без второго store.
- Auth-формы оставлены визуальными: никаких auth API, RTK Query endpoints, токенов, cookies, валидации и автоперехода.
- Формат identifier не предполагался: в интерфейсе используется нейтральная подпись, точные поля будут уточнены после изучения backend.

### Результаты проверок

- `npm run lint` — успешно.
- `npm run typecheck` — успешно.
- `npm run build` — успешно, 2698 модулей, только warning о размере чанка.
- `npm run dev -- --host 127.0.0.1 --port 4188 --strictPort` — `/`, `/login`, `/register`, `/dashboard`, `/debts`, `/contacts`, `/folders`, `/payments`, `/users`, `/archive` и `/unknown` отдают `HTTP 200`; лог Vite без ошибок.
- Grep подтвердил отсутствие выдуманных API/авторизации и наличие `disabled` на обеих кнопках отправки.

### Далее

- Создать отдельный коммит `feat: add premium fintech landing and auth pages` без push.
- После получения контрактов backend уточнить identifier, подключить RHF + Zod и реальные endpoint’ы через `baseApi.injectEndpoints`.

---

## 2026-11-19 — Redesign AuthLayout: Premium Minimal Fintech

### Цель

Переработать только левую декоративную панель общего `AuthLayout` для `/login` и `/register`, сохранив правую часть и всю логику без изменений.

### Что проверено перед стартом

- Прочитаны `AGENTS.md`, `PROJECT_CONTEXT.md`, `CODING_STYLE.md`, `TASKS.md` и последние записи `DEVELOPMENT_LOG.md`.
- Git status: ветка `master`, HEAD `dc17a2b`, tracked-изменений нет; неотслеживаемые design-ассеты не трогались.
- Текущий `AuthLayout`: градиент `from-primary via-secondary to-primary`, сетка, три блока `auth.sideDebts/sideContacts/sidePayments` и подпись `demoMode`.
- Скриншоты в сообщении и доступных директориях не обнаружены; в `ADL58_V2_Designs/` находятся только старые макеты внутренних страниц. Работа выполнена строго по текстовым требованиям.

### Что удалено

- Яркий фиолетовый градиент левой панели.
- Фоновая сетка `sideGridStyle`.
- Три декоративных блока «Долги», «Контакты», «Платежи» и их неиспользуемые i18n-ключи.
- Надпись «Демо-интерфейс без подключения к backend» в левой панели.

### Что добавлено

- Фон панели `#111820`, одинаковый в light/dark темах.
- Три мягких угловых `radial-gradient`: purple `rgba(124, 58, 237, 0.14)`, warm `rgba(245, 158, 11, 0.08)`, emerald `rgba(16, 185, 129, 0.12)`.
- Верхняя подпись `ADL58 V2`, центральный заголовок «Ваши финансы под контролем» и приглушённое описание «Управляйте долгами, контактами и платежами в одном удобном приложении.»
- Крупная типографика, белый заголовок, `text-slate-400` для описания, минималистичная компоновка без карточек, диаграмм и таблиц.
- Desktop: панель занимает 50% ширины через `lg:grid-cols-2`; mobile: панель скрыта, форма занимает всю ширину.

### Изменённые файлы

- `src/components/layout/AuthLayout.tsx`.
- `src/i18n/index.ts` — обновлены `auth.sideTitle`/`auth.sideDescription`, удалены ключи трёх старых декоративных блоков.
- `PROJECT_CONTEXT.md`, `TASKS.md`, `DEVELOPMENT_LOG.md`.

### Проблемы

- Скриншоты-референсы недоступны в окружении; визуальное сравнение с ними не выполнялось.
- Браузерная проверка консоли и адаптивности по-прежнему недоступна.
- Vite предупреждает о размере JS-чанка (~1011 kB).

### Решения

- Использован один общий `AuthLayout`, поэтому изменения одновременно применяются к `/login` и `/register` без дублирования компонентов.
- Правый блок не изменён: поля, кнопки, ссылки, show/hide пароля, language/theme switch и маршрутизация сохранены.
- Auth API, RTK Query endpoints, RHF, Zod, protected routes и бизнес-логика не добавлялись.

### Результаты проверок

- `npm run lint` — успешно.
- `npm run typecheck` — успешно.
- `npm run build` — успешно, 2698 модулей, только warning о размере чанка.
- `npm run dev -- --host 127.0.0.1 --port 4189 --strictPort` — `/login` и `/register` отдают `HTTP 200`, лог Vite без ошибок.
- Grep подтвердил наличие `#111820` и трёх указанных radial-gradient, отсутствие старых декоративных ключей и demo-подписи в `AuthLayout`.

### Далее

- Создать отдельный коммит `refactor: redesign auth left panel` без push.

---

## 2026-11-19 — Диагностика и исправление 404 на Login

### Цель

Найти точную причину `404 Not Found` при работе страницы входа и исправить её минимальными изменениями без переписывания `LoginPage.tsx`.

### Что проверено перед стартом

- Прочитаны `AGENTS.md`, `PROJECT_CONTEXT.md`, `CODING_STYLE.md`, `TASKS.md` и последние записи `DEVELOPMENT_LOG.md`.
- Ветка `master`, HEAD `a032e39`, tracked-изменений не было; неотслеживаемые design-ассеты не трогались.
- Обнаружена незакоммиченная предыдущая работа: `.env.example`, `src/api/baseApi.ts`, `src/pages/Auth/LoginPage.tsx` и каталог `src/features/auth/`.
- Фактический файл типов называется `authType.ts`, а не `authTypes.ts`, как указано в задаче.

### Диагностика

- `src/main.tsx`: `Provider`, `BrowserRouter` и маршрут `/login` подключены корректно.
- `LoginPage.tsx`: `handleSubmit(onSubmit)` вызывается, RHF + Zod useForm подключены, `useLoginMutation` используется.
- `authApi.ts`: мутация `login` использует `POST /api/auth/login`, дублирования `/api` нет.
- `baseApi.ts`, `store.ts`: `fetchBaseQuery`, reducer и middleware RTK Query подключены правильно.
- `vite.config.ts`: proxy не настроен, поэтому относительный URL уходил бы на origin Vite.
- Локального `.env` не было; `.env.example` уже содержал ожидаемый адрес, но Vite его не загружает.
- `GET http://localhost:4000/health` — `HTTP 200`, `{"status":"ok"}`.
- `POST http://localhost:4000/api/auth/login` с несуществующими тестовыми данными — `HTTP 401`; маршрут backend зарегистрирован, CORS разрешает origin frontend.
- До исправления: `GET http://127.0.0.1:4190/login` — `HTTP 200`, но `POST http://127.0.0.1:4190/api/auth/login` — `HTTP 404`.

### Причина

`VITE_API_BASE_URL` был `undefined`, поэтому `fetchBaseQuery` формировал относительный URL `/api/auth/login` и отправлял запрос на порт Vite, а не на backend `http://localhost:4000`. Ошибка возникала при отправке Login-запроса, а не при открытии `/login`.

### Проблемы

- Незакоммиченный `authSlice.ts` содержал JSX в `.ts` файле и ломал `lint`/`typecheck`.
- В `LoginPage.tsx` оставались debug `console.log`, включая логирование ошибок валидации.
- Браузерная проверка сети/консоли недоступна; тестовый фреймворк в проекте не настроен, поэтому регрессионный тест не добавлялся.

### Решения

- Предыдущая работа сохранена отдельным коммитом `e64985a`; `authSlice.ts` переименован в `authSlice.tsx` и остался неиспользуемым placeholder без подключения к store.
- Создан локальный `.env` с единственной публичной переменной `VITE_API_BASE_URL=http://localhost:4000`; файл игнорируется Git.
- Удалены debug `console.log` из `LoginPage`; отображение ошибок и успешного входа, RHF, Zod, RTK Query, toggle пароля и маршрутизация сохранены.
- backend, JWT storage, refresh token и protected routes не изменялись и не добавлялись.

### Изменённые файлы в исправлении

- `.env` — локальный файл, не включается в коммит.
- `src/pages/Auth/LoginPage.tsx` — удалены debug-логи.
- `PROJECT_CONTEXT.md`, `TASKS.md`, `DEVELOPMENT_LOG.md`.

### Результаты проверок

- `npm run lint` — успешно.
- `npm run typecheck` — успешно.
- `npm run build` — успешно, 2798 модулей, warning о размере JS-чанка (~1131 kB).
- `npm run dev -- --host 127.0.0.1 --port 4191 --strictPort` — `/login` и `/register` отдают `HTTP 200`, лог Vite без ошибок.
- Собранный JS содержит `http://localhost:4000` и `/api/auth/login`.
- `POST http://localhost:4000/api/auth/login` с origin `http://127.0.0.1:4191` — `HTTP 401`, `Access-Control-Allow-Origin` совпадает с origin.

### Далее

- Создать отдельный коммит `fix: resolve login 404 error` без push.

---

## 2026-11-19 — Интеграция реальных контактов в ContactsPage

### Цель

Убрать моковые данные и дублирующие состояния из `ContactsPage`, оставив получение контактов только через RTK Query и сохранив текущий дизайн.

### Что проверено перед стартом

- Прочитаны `AGENTS.md`, `PROJECT_CONTEXT.md`, `CODING_STYLE.md`, `TASKS.md` и последние записи `DEVELOPMENT_LOG.md`.
- Ветка `master`, HEAD `a6cb1de`.
- В рабочем дереве обнаружены незакоммиченные посторонние изменения в auth/store/main и новых auth/contacts файлах; они не перезаписывались.
- Локальный Swagger-файл в репозитории отсутствует; структура `Contact` сверена с контрактом из задачи.
- `GET http://localhost:4000/health` — `HTTP 200`; `GET http://localhost:4000/api/contacts` без токена — `HTTP 401`, то есть маршрут существует.

### Найденные ошибки

- Двойной импорт `useGetContactsQuery` из `@/features/contacts/contactsApi`.
- `isFetching` использовался в кнопке и иконке, но отсутствовал в результате хука.
- Внутри каждой карточки дублировались Loading, Error и Empty State, хотя общие состояния уже были выше.
- Импорт `contacts` из `@/mocks/mockData` уже был убран незакоммиченной работой, но требовалось подтвердить отсутствие fallback при пустом ответе.

### Что исправлено

- Удалён второй импорт `useGetContactsQuery`.
- В результат `useGetContactsQuery()` добавлен `isFetching` с корректным отступом.
- Удалены внутренние блоки Loading/Error/Empty внутри карточек.
- `contacts` остаётся только данными из `useGetContactsQuery()`.
- Сохранены поиск по имени, email и телефону, Skeleton, Error State, Empty State, Retry, демо-диалог Add/Edit и адаптивная сетка.

### Изменённые файлы

- `src/pages/Contacts/ContactsPage.tsx`.
- `CODING_STYLE.md`, `PROJECT_CONTEXT.md`, `TASKS.md`, `DEVELOPMENT_LOG.md`.
- `src/features/contacts/contactsApi.ts` проверен, но не изменялся: endpoint и поля соответствуют заданию.

### Проблемы

- Полные `npm run lint`, `npm run typecheck` и `npm run build` не проходят из-за посторонних незакоммиченных файлов: syntax error в `contactsSlice.ts` и неиспользуемые переменные в `LoginPage.tsx`/`RegisterPage.tsx`.
- Реальные контакты не получены: нет тестовых учётных данных, запрос без токена ожидаемо вернул `401`.
- Браузерная проверка недоступна.

### Решения

- Посторонние файлы не изменялись и не включались в коммит.
- Для проверки собственного кода использованы `npx eslint` на `ContactsPage`, временный целевой tsconfig вне репозитория и `npx vite build`.
- Авторизация в `baseApi.ts` не трогалась; `prepareHeaders` продолжает использовать существующий токен.

### Результаты проверок

- `npx eslint src/pages/Contacts/ContactsPage.tsx` — успешно.
- Target `npx tsc` для `ContactsPage.tsx` и `contactsApi.ts` — успешно.
- `npx vite build` — успешно.
- Grep: один импорт `useGetContactsQuery`, `isFetching` в destructuring и кнопке, `mockData` в `ContactsPage` отсутствует.
- `npm run lint`, `npm run typecheck`, `npm run build` — заблокированы посторонними файлами.

### Далее

- Создать отдельный коммит `fix: use real contacts in ContactsPage` без push.

---

## 2026-11-21 — Меню пользователя, профиль и logout

### Цель

Добавить профильное меню в защищённый layout, страницу `/profile` и настоящий выход через уже существующий backend, не изменяя backend и не трогая посторонние незакоммиченные файлы.

### Что проверено перед стартом

- Прочитаны `AGENTS.md`, `PROJECT_CONTEXT.md`, `CODING_STYLE.md`, `TASKS.md` и последние записи `DEVELOPMENT_LOG.md`.
- Ветка `master`, HEAD `02efbe2`.
- Рабочее дерево содержало незакоммиченные auth/store/main/register/dashboard/contacts файлы; посторонние файлы не перезаписывались.
- Фактический файл типов называется `authType.ts`, а не `authTypes.ts`; файл защищённого маршрута называется `ProtextedRotues.tsx`, компонент внутри — `ProtectedRoute`.
- `GET http://localhost:4000/health` — `HTTP 200`; `OPTIONS http://localhost:4000/api/auth/logout` — `HTTP 204`; `GET http://localhost:4000/api/users/me` без токена — `HTTP 401`.
- Контракт `PATCH /api/users/me` не проверен, поэтому редактирование профиля не добавлялось.

### Запрос к владельцу

Полные проверки до начала работы падали из-за посторонних незакоммиченных файлов: синтаксис в `contactsSlice.ts`, неиспользуемые переменные в `LoginPage.tsx`/`RegisterPage.tsx`, неиспользуемый `body` в `authApi.ts` и использование `response` до объявления в `RegisterPage.tsx`. Владелец выбрал вариант не изменять посторонние файлы, поэтому эти ошибки оставлены без правок.

### Что реализовано

- `src/components/layout/ProfileMenu.tsx`: кнопка после ThemeSwitcher, аватар с первой буквой, имя из `state.auth.user`, стрелка, нейтральный fallback, адаптивное скрытие имени на мобильных.
- Dropdown на существующем shadcn/ui `DropdownMenu`: аватар, имя, email, разделитель, «Мой профиль» с `UserRound`, «Выйти из аккаунта» с `LogOut` и destructive-стилем.
- `src/pages/Profile/ProfilePage.tsx`: данные только из `useGetMeQuery`, Skeleton, Error State с Retry, имя, email, дата регистрации и аватар.
- `src/main.tsx`: маршрут `/profile` внутри `ProtectedRoute`; `Toaster` из уже установленного sonner подключён один раз.
- `src/features/auth/authApi.ts` и `authType.ts`: logout mutation `POST /api/auth/logout` с телом `{ refreshToken }`.
- Logout: получает refreshToken из localStorage, не отправляет запрос без токена, при ошибке показывает понятный toast, всегда удаляет refreshToken, очищает Redux auth state и кэш RTK Query, закрывает меню и перенаправляет на `/login`.
- Повторные нажатия Logout блокируются локальным флагом и состоянием mutation.

### Изменённые файлы

- `src/components/layout/AppShell.tsx`, `src/components/layout/ProfileMenu.tsx`, `src/pages/Profile/ProfilePage.tsx`, `src/main.tsx`.
- `src/features/auth/authApi.ts`, `src/features/auth/authType.ts`.
- `PROJECT_CONTEXT.md`, `TASKS.md`, `DEVELOPMENT_LOG.md`.
- В commit включается существующая auth-инфраструктура, без которой новый маршрут и меню не работают: `baseApi.ts`, `store.ts`, `authSlice.ts`, `userApi.ts`, `AuthInitializer.tsx`, `ProtextedRotues.tsx`, `LoginPage.tsx`, `AuthTests.tsx`.

### Проблемы

- Полные `npm run lint`, `npm run typecheck` и `npm run build` остаются заблокированными посторонними файлами по прямому решению владельца.
- Браузер и реальные учётные данные недоступны, поэтому визуальное поведение dropdown, клавиатура, повторный login и восстановление сессии после перезагрузки требуют ручной проверки.

### Решения

- Посторонние файлы с ошибками не изменялись.
- ThemeSwitcher и `PublicHeader` не трогались; меню добавлено только в защищённый `AppShell`.
- Для проверки нового кода использованы targeted ESLint, целевой tsconfig вне репозитория и `npx vite build`.
- В целевом tsconfig отключён `noUnusedParameters` только из-за существующей ошибки в `authApi.ts`; исходный файл не изменялся сверх добавления logout.

### Результаты проверок

- Targeted ESLint для `ProfileMenu.tsx`, `ProfilePage.tsx`, `AppShell.tsx`, `main.tsx` — успешно.
- Targeted TypeScript для auth/profile/layout файлов — успешно.
- `npx vite build` — успешно, только warning о размере чанка.
- Dev-сервер на `127.0.0.1:4192` — `HTTP 200` для `/profile` и `/login`.
- Полные проверки — заблокированы указанными посторонними файлами.

### Далее

- Создать отдельный коммит `feat: add profile menu and logout` без push.
- Передать владельцу список проверок, которые требуют ручного тестирования с реальной сессией.

---

## 2026-11-21 — CRUDcontacts через RTK Query

### Цель

Реализовать полный CRUD контактов через существующий backend, не изменяя backend, авторизацию, дизайн и посторонние незакоммиченные файлы.

### Что проверено перед стартом

- Прочитаны `AGENTS.md`, `PROJECT_CONTEXT.md`, `CODING_STYLE.md`, `TASKS.md` и последние записи `DEVELOPMENT_LOG.md`.
- Ветка `master`, HEAD `2ac0f41`; status содержал посторонние изменения в `RegisterPage.tsx`, `DashboardPage.tsx`, `registrSchema.tsx`, `src/features/dashboard/`, untracked design assets и `contactsSlice.ts`.
- Фактические `ContactsPage.tsx`, `contactsApi.ts`, `baseApi.ts`, `store.ts`, `i18n/index.ts`, shadcn `Dialog`, `AlertDialog`, `Field`, `Input` и `Label` прочитаны до изменений.
- `OPTIONS` для `POST /api/contacts`, `PATCH /api/contacts/:id`, `DELETE /api/contacts/:id`, `GET /api/contacts/:id`, `GET /api/folders` и `GET /api/contacts?folder_id=...` вернул `HTTP 204`.
- Локальный Swagger-файл отсутствует; реальные POST/PATCH/DELETE без тестовых данных не выполнялись.

### Что реализовано

- `src/api/baseApi.ts`: добавлен `tagTypes: ['Contact']`, исправлен отступ `cache`, `prepareHeaders` не изменён.
- `src/features/contacts/contactsApi.ts`: добавлены `getContact`, `createContact`, `updateContact`, `deleteContact` и инвалидация Contact LIST/detail tags.
- `src/features/contacts/contactsSchema.ts`: Zod-схема name/phone/email/note с сообщениями через `createContactSchema(t)`.
- `src/pages/Contacts/ContactsPage.tsx`: демо-диалог заменён реальными Add/Edit формами на RHF + Zod + `Field`, добавлен Delete `AlertDialog`, тосты sonner, note в карточке, поиск, loading/error/empty/no-results/success состояния и локализация текста.
- `src/i18n/index.ts`: добавлены ключи contacts CRUD для ru/tj/en, включая validation-сообщения.
- Fan out mutation payload содержит только `name`, `phone`, `email`, `note`; server-поля и `folder_id` не отправляются.

### Изменённые файлы

- `src/api/baseApi.ts`, `src/features/contacts/contactsApi.ts`, `src/features/contacts/contactsSchema.ts`, `src/pages/Contacts/ContactsPage.tsx`, `src/i18n/index.ts`.
- `PROJECT_CONTEXT.md`, `TASKS.md`, `DEVELOPMENT_LOG.md`.

### Проблемы

- Полные `npm run lint`, `npm run typecheck` и `npm run build` по-прежнему падают из-за посторонних/сохранённых файлов: `authApi.ts`, `contactsSlice.ts`, `LoginPage.tsx`, `RegisterPage.tsx`.
- Браузерная проверка реальных mutation-сценариев недоступна без тестовых учётных данных и подготовленных контактов.
- Формат ответа `GET /api/folders` не изучался, поэтому выбор папки не добавлялся.

### Решения

- Посторонние незакоммиченные файлы не изменялись и не включались в коммит.
- Для нового кода использованы отдельный target tsconfig вне репозитория, targeted ESLint, `npx vite build` и dev-проверка маршрута.
- Успех/ошибки mutations показываются через уже подключённый `sonner`, без новой библиотеки.
- i18n-ключи добавлены во все три языка без изменения языка по умолчанию.

### Результаты проверок

- Targeted `npx tsc -p C:/Users/User/AppData/Local/Temp/opencode/tsconfig.contacts-crud.json --pretty false` — успешно.
- `npx eslint src/api/baseApi.ts src/features/contacts/contactsApi.ts src/features/contacts/contactsSchema.ts src/pages/Contacts/ContactsPage.tsx src/i18n/index.ts` — успешно.
- `npx vite build` — успешно, только warning о размере JS-чанка.
- `npm run dev -- --host 127.0.0.1 --port 4193 --strictPort`: `GET /contacts` — `HTTP 200`, лог Vite без ошибок.
- `npm run lint`, `npm run typecheck`, `npm run build` — заблокированы известными посторонними ошибками; новых ошибок в файлах CRUDcontacts нет.

### Далее

- Создать отдельный коммит `feat: implement contacts CRUD with RTK Query` без push.
- Провести браузерную проверку create/edit/delete и валидации с подготовленными тестовыми данными; реальные mutation-запросы не выполнялись.

## 2026-11-21 — Debts CRUD (этап 3)

DebtsPage переведена с mockData на GET /api/debts с серверными status/direction/contact_id, GET /api/debts/:id, POST, PATCH и DELETE. Формы: React Hook Form (register/setValue/reset/handleSubmit/SubmitHandler), Zod, useState; Select контактов с Controller, реальные контакты из useGetContactsQuery. Есть просмотр, подтверждение удаления, Skeleton, Retry, пустые состояния, pending-кнопки, уведомления и RU/TJ/EN.

Контракт сверен с ../Debt_back/src/modules/debts/{debts.schema,debts.service,debts.controller,debts.routes}.ts и src/docs/openapi.ts (только чтение): сумма >0, <=1e9, currency 1–8 символов, description <=1000, дата YYYY-MM-DD. PostgreSQL numeric может приходить строкой. Пустая дата исключается из JSON; очистка установленной даты сервером не поддерживается и блокируется схемой с пояснением. Статусы и платежи не отправляются; остатки и суммы по разным валютам не рассчитываются. DELETE каскадно удаляет связанные платежи по контракту сервера, это указано в подтверждении.

Добавлены Debt и Dashboard без удаления существующих тегов. В main.tsx через baseApi.enhanceEndpoints зарегистрирован простой Dashboard tag существующего запроса summary после загрузки модулей (с проверкой наличия endpoint): это позволяет не переписывать чужой untracked dashboardApi.ts. Авторизация, Refresh Token, Contacts/Folders и backend не изменялись.

Проверки: целевой TypeScript и ESLint нового кода успешны; изолированные schema/RTK Query проверки успешны; npx vite build успешен (warning о чанке >500 kB); dev-маршруты /debts, /contacts, /folders — HTTP 200. Полные tsc -b --noEmit и npm run build блокируются прежним JSX в contactsSlice.ts. Полный lint содержит 7 прежних ошибок auth/contacts. Живой backend /health — 200, защищённые GET debts/detail/contacts/folders без токена — 401. Авторизованный CRUD и браузерное поведение не проверены без тестовой сессии.

Code Review: нет моковых долгов, смешения валют, ручного статуса, оптимистического удаления или useEffect заполнения формы; id исключается из PATCH body; проверены NaN/Infinity/границы суммы/UUID/календарная дата, соответствие переводов и refetch list/detail/Dashboard. В прежнем Contacts обнаружено несоответствие: обязательный folder_id схемы отсутствует в форме. Оно оставлено владельцу, так как не связано с интеграцией долгов.

Исходные незакоммиченные файлы скопированы в .git/debts-crud-backup-20261121-154009, включая working.patch/index.patch. Коммит долгов содержит только собственные изменения; старые Folder-тег и изменение заголовка Dashboard в i18n остаются вне него. Проверочные скрипты сохранены локально в .git/debts-check.cjs и .git/debts-smoke.cjs; целевой tsconfig — .git/tsconfig.debts.json. Для повторения: node .git/debts-check.cjs; npx tsc -p .git/tsconfig.debts.json --noEmit. Git push не выполнялся.

## 2026-11-21 — Этап 5: Payments

### Реализация

- Добавлены src/features/payments/paymentsApi.ts, paymentsSchema.ts и DebtPayments.tsx. API использует только baseApi.injectEndpoints: GET /api/debts/:id/payments и POST /api/debts/:id/payments. Mutation типизирована фактическим ответом { payment, debt }; OpenAPI ошибочно описывает только Payment. PATCH/DELETE платежей отсутствуют и не добавлялись.
- В просмотре долга доступна кнопка «История платежей»: реальные история и форма RHF/Zod, register/reset/handleSubmit/SubmitHandler, useState, без useEffect. История загружается после раскрытия, currentData и key по debt.id предотвращают показ другой истории. Форма остаётся смонтированной при обновлении долга, ввод сохраняется при ошибке; reset вызывается только после успешного POST. Кнопки и закрытие диалога блокируются во время сохранения.
- Payment зарегистрирован рядом с Debt/Dashboard; providesTags ['Payment'], invalidatesTags ['Payment', 'Debt', 'Dashboard']. Используется существующая настройка тега Dashboard в main.tsx. Проверено обновление истории, detail, списка и Dashboard, включая повторную загрузку активных запросов.
- Сумма переводится в число через valueAsNumber, Zod отсекает NaN/Infinity, <=0 и >1e9; note <=500. Необязательное локальное datetime-local преобразуется в ISO UTC; пустые note/paid_at исключаются из JSON, время по умолчанию задаёт сервер. Валюта отображается из долга, но не отправляется в POST.
- Добавлены переводы RU/TJ/EN в src/i18n/payments.ts и подключены к существующему i18next. Старые моковые финансовые данные и несуществующее редактирование платежей на /payments заменены карточкой перехода к выбору реального долга. Sidebar, Header, темы и общий shell сохранены.

### Контракт и финансовое поведение

Исходники ../Debt_back/src/modules/debts/debts.schema.ts, debts.service.ts, debts.controller.ts, debts.routes.ts и src/docs/openapi.ts изучены только для чтения. Backend использует timestamptz для paid_at, принимает переплату и возвращает обновлённый долг. Реальный код addPayment проверен с изолированным адаптером БД: 100/30 -> partial, 10/10 -> paid, 10/15 -> paid. Обратный долг на разницу не создаётся. Остаток не возвращается, frontend его не вычисляет и статус не назначает. Это проверка кода сервиса в изоляции, без реальных записей PostgreSQL. Авторизация и Refresh Token не изменены.

### Проверки и Code Review

- Целевые npx tsc -p .git/tsconfig.payments.json --noEmit --incremental false и ESLint всех изменённых исходников — успешно.
- Изолированные проверки схемы (числа/даты/длина), совпадения RU/TJ/EN ключей, реального RTK Query с тестовым транспортом — успешно: debtId, GET/POST, исключение debtId/currency/status из тела, {payment,debt}, обработка 422 без автоматического повторного POST, инвалидация и refetch истории/detail/списка/Dashboard.
- node .git/debts-check.cjs — успешно: регрессия Debts CRUD, схема, фильтры, payloads, Authorization и инвалидация.
- npx vite build — успешно, 2431 модуль; warning о JS-чанке >500 kB.
- Dev smoke: /debts, /contacts, /folders — HTTP 200. Это проверка запуска SPA, не проверка диалогов в браузере.
- Полные npx tsc -b --noEmit и npm run build не проходят из-за существующих auth/Contacts ошибок: неиспользуемые body/setSuccessMessage/setServerError/Controller/Folder/useGetFoldersQuery, отсутствующий response в RegisterPage, регистр AuthTests.tsx/authTests.tsx. Полный npm run lint содержит 6 прежних ошибок auth/Contacts; ошибок Payments нет. contactsSlice.ts уже отсутствует в рабочем дереве, команды этого этапа его не удаляли; исходная копия сохранена. Импортов contactsSlice не найдено.
- Проверены сохранение формы при ошибке, блокировка повторной отправки и закрытия во время POST, отсутствие useEffect и ручных финансовых расчётов, отсутствие моковых платежей в интерфейсе. Найденный при интеграции BOM на второй строке DebtsPage исправлен.
- /health — HTTP 200; GET истории без токена — 401. Авторизованной тестовой сессии нет: реальные POST, проверка частичного погашения на PostgreSQL и браузерная работа не проводились. Реальные финансовые записи не изменялись.

### Git и сохранность

Исходные посторонние изменения и затрагиваемые файлы сохранены в .git/payments-backup-20261121-155916 (working.patch, index.patch, files). Чужие auth/Contacts/Folders/Dashboard/design assets не включаются в коммит; старые Folder tag и заголовок Dashboard в i18n остаются незакоммиченными. Коммит: feat: implement debt payments. Git push не выполняется. Первоначальный технический сбой автоматического согласования записи устранён при продолжении задачи.

### Далее

Авторизованная браузерная проверка на специально подготовленных тестовых долгах; исправление прежних auth/Contacts ошибок отдельной задачей. Разницу при переплате backend не переносит в обратное направление — для изменения этого поведения нужна отдельная задача backend.

## 2026-11-21 — Проверка и завершение коммита Payments

### Фактическое состояние

Рабочая директория и корень Git: C:/Users/User/Desktop/New folder, разрешённая область записи соответствует проекту. До завершения HEAD — 5201b91, index пуст; Payments существует в рабочем дереве, коммита ещё нет. Формулировка «Коммит: feat: implement debt payments» в предыдущей записи обозначала запланированный коммит. Устаревший вводный статус PROJECT_CONTEXT.md уточнён без удаления исторических решений.

Проверены все изменённые файлы и новые исходники, включая посторонние auth/Contacts/Folders/Dashboard. Backend прочитан только для сверки GET/POST, схемы, ответа {payment,debt} и преобразования PostgreSQL NUMERIC в number. Изменений backend, авторизации, бизнес-правил и реальных финансовых записей нет. Подтверждённых проблем в существующей реализации Payments не найдено; исходники Payments не переписывались.

### Проверки

- npx.cmd tsc -b --noEmit, npm.cmd run typecheck, npm.cmd run build — 8 прежних TypeScript ошибок: authApi/body, LoginPage/setSuccessMessage и регистр AuthTests/authTests, RegisterPage/setServerError и отсутствующий response, ContactsPage/Controller/Folder/useGetFoldersQuery. Build останавливается на TypeScript до запуска Vite.
- npm.cmd run lint — 6 прежних no-unused-vars ошибок в authApi/LoginPage/RegisterPage/ContactsPage; ошибок Payments нет.
- npx.cmd tsc -p .git/tsconfig.payments.json --noEmit --incremental false и целевой ESLint payments/DebtsPage/PaymentsPage/i18n/baseApi — успешно.
- node node_modules/.tmp/payments-review.cjs — успешно: границы amount/note/дат, соответствие и покрытие переводов RU/TJ/EN, реальные RTK Query endpoints с изолированным транспортом, Authorization, GET/POST и payload, ответ {payment,debt}, исключение пустых optional полей, ошибка 422 без повторного POST, фактический refetch истории/detail/списка/Dashboard. Это проверка frontend без запросов к реальным финансовым данным.
- node .git/debts-check.cjs — регрессия Debts успешна.
- npx.cmd vite build — успешно, 2431 модуль; предупреждение о JS-чанке 850.36 kB (>500 kB).
- node node_modules/.tmp/payments-smoke.cjs — запуск через Vite API: /debts и /payments HTTP 200 (только SPA shell); backend /health 200, GET истории с тестовым UUID без токена 401. Сервер проверки закрыт. Авторизованные POST и браузерные сценарии не проводились.
- PowerShell запрещает запуск npm.ps1/npx.ps1; использованы стандартные npm.cmd/npx.cmd без изменения системной политики.
- git diff --check показывает только прежние trailing spaces в RegisterPage, вне Payments; staging Payments проверяется отдельно.

### Состав коммита и дальнейшие границы

В feat: implement debt payments включаются src/features/payments/{paymentsApi.ts,paymentsSchema.ts,DebtPayments.tsx}, src/i18n/payments.ts, PaymentsPage, интеграция DebtsPage, только Payment tag в baseApi, только Payments-переводы в i18n/index.ts и три документа контекста. Прежние Folder tag и заголовок Dashboard остаются в рабочем дереве, как и остальные изменения auth/Contacts/Folders/Dashboard/design assets. Git push не выполняется. Dashboard и исправление прежних ошибок — следующие отдельные задачи по решению владельца.
