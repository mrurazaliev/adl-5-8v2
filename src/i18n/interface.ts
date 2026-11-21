export const interfaceTranslations = {
  ru: {
    auth: {
      name: 'Имя', namePlaceholder: 'Введите имя', email: 'Email', emailPlaceholder: 'Введите email',
      loggingIn: 'Выполняется вход…', registering: 'Регистрация…', loginError: 'Не удалось войти. Проверьте email и пароль.', registerError: 'Не удалось зарегистрироваться. Проверьте данные и повторите.',
      checking: 'Проверка авторизации…', unauthenticated: 'Пользователь не авторизован', userLoading: 'Загрузка пользователя…', userError: 'Не удалось загрузить пользователя.', welcome: 'Добро пожаловать, {{name}}!',
      validation: { nameRequired: 'Введите имя.', nameMax: 'Имя — не более 120 символов.', email: 'Введите корректный email.', passwordRequired: 'Введите пароль.', passwordLength: 'Пароль должен содержать от 6 до 128 символов.', confirmation: 'Пароли не совпадают.' },
    },
    profile: {
      title: 'Мой профиль', subtitle: 'Информация о вашей учётной записи', user: 'Пользователь', emailUnavailable: 'Email недоступен', account: 'Информация об аккаунте', name: 'Имя', email: 'Email', registered: 'Дата регистрации', unavailable: 'Данные пользователя недоступны.', loadError: 'Не удалось загрузить данные профиля.', retry: 'Попробовать снова', menu: 'Меню пользователя', logout: 'Выйти из аккаунта', loggingOut: 'Выход…', logoutError: 'Не удалось сообщить серверу о выходе. Локальная сессия завершена.',
    },
    common: {
      close: 'Закрыть', cancel: 'Отмена', save: 'Сохранить', unavailable: 'Нет данных', saveUnavailable: 'Сохранение недоступно', demoField: 'Параметр {{number}}', demoPlaceholder: 'Не заполняется в демо', demoDescription: 'Состав полей и правила сохранения ещё не настроены.', filtersUnavailable: 'Фильтры ещё не настроены',
      statuses: { active: 'Активен', pending: 'Ожидает', partial: 'Частично погашен', overdue: 'Просрочен', paid: 'Погашен', completed: 'Завершён', archived: 'В архиве', new: 'Новый' },
    },
    folders: {
      title: 'Папки', subtitle: 'Категории для организации данных', count: 'Папок: {{count}}', refresh: 'Обновить', retry: 'Повторить', loadError: 'Не удалось загрузить папки.', emptyTitle: 'Папок пока нет', emptyDescription: 'Добавьте первую папку для организации контактов.', addFolder: 'Создать папку', noColor: 'Цвет не указан', addTitle: 'Создание папки', editTitle: 'Редактирование папки', addDescription: 'Укажите название и цвет новой папки.', editDescription: 'Измените название и цвет папки.', deleteTitle: 'Удалить папку?', deleteDescription: 'Папка будет удалена. Контакты останутся без этой папки.', delete: 'Удалить', deleting: 'Удаление…', cancel: 'Отмена', save: 'Сохранить', saving: 'Сохранение…', fields: { name: 'Название', color: 'Цвет' }, messages: { created: 'Папка создана.', updated: 'Папка обновлена.', deleted: 'Папка удалена.', saveError: 'Не удалось сохранить папку.', deleteError: 'Не удалось удалить папку.' }, validation: { nameRequired: 'Введите название папки.', nameMax: 'Название — не более 120 символов.', colorInvalid: 'Выберите цвет в формате #RRGGBB.' },
    },
  },
  tj: {
    auth: {
      name: 'Ном', namePlaceholder: 'Номро ворид кунед', email: 'Email', emailPlaceholder: 'Email-ро ворид кунед',
      loggingIn: 'Воридшавӣ…', registering: 'Бақайдгирӣ…', loginError: 'Ворид шудан муяссар нашуд. Email ва гузарвожаро санҷед.', registerError: 'Бақайдгирӣ муяссар нашуд. Маълумотро санҷида такрор кунед.',
      checking: 'Санҷиши иҷозат…', unauthenticated: 'Корбар ворид нашудааст', userLoading: 'Боркунии корбар…', userError: 'Корбар бор нашуд.', welcome: 'Хуш омадед, {{name}}!',
      validation: { nameRequired: 'Номро ворид кунед.', nameMax: 'Ном набояд аз 120 аломат зиёд бошад.', email: 'Email-и дурустро ворид кунед.', passwordRequired: 'Гузарвожаро ворид кунед.', passwordLength: 'Гузарвожа бояд аз 6 то 128 аломат дошта бошад.', confirmation: 'Гузарвожаҳо мувофиқ нестанд.' },
    },
    profile: {
      title: 'Профили ман', subtitle: 'Маълумоти ҳисоби шумо', user: 'Корбар', emailUnavailable: 'Email дастрас нест', account: 'Маълумоти ҳисоб', name: 'Ном', email: 'Email', registered: 'Санаи бақайдгирӣ', unavailable: 'Маълумоти корбар дастрас нест.', loadError: 'Маълумоти профил бор нашуд.', retry: 'Аз нав кӯшиш кунед', menu: 'Менюи корбар', logout: 'Баромадан аз ҳисоб', loggingOut: 'Баромадан…', logoutError: 'Ба сервер дар бораи баромадан хабар дода нашуд. Сессияи маҳаллӣ анҷом ёфт.',
    },
    common: {
      close: 'Пӯшидан', cancel: 'Бекор кардан', save: 'Захира кардан', unavailable: 'Маълумот нест', saveUnavailable: 'Захиракунӣ дастрас нест', demoField: 'Параметри {{number}}', demoPlaceholder: 'Дар намоиш пур намешавад', demoDescription: 'Майдонҳо ва қоидаҳои захиракунӣ ҳоло танзим нашудаанд.', filtersUnavailable: 'Филтрҳо ҳоло танзим нашудаанд',
      statuses: { active: 'Фаъол', pending: 'Интизорӣ', partial: 'Қисман пардохтшуда', overdue: 'Муҳлатгузашта', paid: 'Пардохтшуда', completed: 'Анҷомёфта', archived: 'Дар бойгонӣ', new: 'Нав' },
    },
    folders: {
      title: 'Папкаҳо', subtitle: 'Категорияҳо барои ташкили маълумот', count: 'Папкаҳо: {{count}}', refresh: 'Навсозӣ', retry: 'Такрор', loadError: 'Папкаҳо бор нашуданд.', emptyTitle: 'Ҳоло папка нест', emptyDescription: 'Барои тартиб додани тамосҳо папкаи аввалро илова кунед.', addFolder: 'Сохтани папка', noColor: 'Ранг нишон дода нашудааст', addTitle: 'Сохтани папка', editTitle: 'Таҳрири папка', addDescription: 'Ном ва ранги папкаи навро ворид кунед.', editDescription: 'Ном ва ранги папкаро иваз кунед.', deleteTitle: 'Папка нест карда шавад?', deleteDescription: 'Папка нест мешавад. Тамосҳо бе ин папка мемонанд.', delete: 'Нест кардан', deleting: 'Несткунӣ…', cancel: 'Бекор кардан', save: 'Захира кардан', saving: 'Захиракунӣ…', fields: { name: 'Ном', color: 'Ранг' }, messages: { created: 'Папка сохта шуд.', updated: 'Папка нав шуд.', deleted: 'Папка нест шуд.', saveError: 'Папка захира нашуд.', deleteError: 'Папка нест нашуд.' }, validation: { nameRequired: 'Номи папкаро ворид кунед.', nameMax: 'Ном набояд аз 120 аломат зиёд бошад.', colorInvalid: 'Рангро бо шакли #RRGGBB интихоб кунед.' },
    },
  },
  en: {
    auth: {
      name: 'Name', namePlaceholder: 'Enter your name', email: 'Email', emailPlaceholder: 'Enter your email',
      loggingIn: 'Signing in…', registering: 'Registering…', loginError: 'Could not sign in. Check your email and password.', registerError: 'Could not register. Check your details and retry.',
      checking: 'Checking authentication…', unauthenticated: 'Not signed in', userLoading: 'Loading user…', userError: 'Could not load the user.', welcome: 'Welcome, {{name}}!',
      validation: { nameRequired: 'Enter your name.', nameMax: 'Name must be 120 characters or fewer.', email: 'Enter a valid email.', passwordRequired: 'Enter your password.', passwordLength: 'Password must be 6–128 characters long.', confirmation: 'Passwords do not match.' },
    },
    profile: {
      title: 'My profile', subtitle: 'Your account details', user: 'User', emailUnavailable: 'Email unavailable', account: 'Account information', name: 'Name', email: 'Email', registered: 'Registration date', unavailable: 'User information is unavailable.', loadError: 'Could not load profile information.', retry: 'Retry', menu: 'User menu', logout: 'Sign out', loggingOut: 'Signing out…', logoutError: 'Could not notify the server about signing out. Your local session has ended.',
    },
    common: {
      close: 'Close', cancel: 'Cancel', save: 'Save', unavailable: 'No data', saveUnavailable: 'Saving unavailable', demoField: 'Field {{number}}', demoPlaceholder: 'Disabled in demo', demoDescription: 'Fields and saving rules are not configured yet.', filtersUnavailable: 'Filters are not configured yet',
      statuses: { active: 'Active', pending: 'Pending', partial: 'Partially paid', overdue: 'Overdue', paid: 'Paid', completed: 'Completed', archived: 'Archived', new: 'New' },
    },
    folders: {
      title: 'Folders', subtitle: 'Categories for organizing data', count: 'Folders: {{count}}', refresh: 'Refresh', retry: 'Retry', loadError: 'Could not load folders.', emptyTitle: 'No folders yet', emptyDescription: 'Add your first folder to organize contacts.', addFolder: 'Create folder', noColor: 'No color specified', addTitle: 'Create folder', editTitle: 'Edit folder', addDescription: 'Enter a name and color for the new folder.', editDescription: 'Update the folder name and color.', deleteTitle: 'Delete folder?', deleteDescription: 'The folder will be deleted. Contacts will remain without this folder.', delete: 'Delete', deleting: 'Deleting…', cancel: 'Cancel', save: 'Save', saving: 'Saving…', fields: { name: 'Name', color: 'Color' }, messages: { created: 'Folder created.', updated: 'Folder updated.', deleted: 'Folder deleted.', saveError: 'Could not save the folder.', deleteError: 'Could not delete the folder.' }, validation: { nameRequired: 'Enter a folder name.', nameMax: 'Name must be 120 characters or fewer.', colorInvalid: 'Choose a color in #RRGGBB format.' },
    },
  },
}
