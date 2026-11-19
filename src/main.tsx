import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '@/app/store'

import App from '@/App'
import '@/i18n'
import '@/styles/index.css'

import ArchivePage from '@/pages/Archive/ArchivePage'
import ContactsPage from '@/pages/Contacts/ContactsPage'
import DashboardPage from '@/pages/Dashboard/DashboardPage'
import DebtsPage from '@/pages/Debts/DebtsPage'
import FoldersPage from '@/pages/Folders/FoldersPage'
import PaymentsPage from '@/pages/Payments/PaymentsPage'
import UsersPage from '@/pages/Users/UsersPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<DashboardPage />} />
            <Route path="debts" element={<DebtsPage />} />
            <Route path="contacts" element={<ContactsPage />} />
            <Route path="folders" element={<FoldersPage />} />
            <Route path="payments" element={<PaymentsPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="archive" element={<ArchivePage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)