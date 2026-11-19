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
