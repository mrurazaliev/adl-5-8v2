import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Toaster } from 'sonner'
import { store } from '@/app/store'

import App from '@/App'
import '@/i18n'
import '@/styles/index.css'

import AuthInitializer from '@/components/shared/AuthInitializer'

import { AuthLayout } from '@/components/layout/AuthLayout'
import { PublicLayout } from '@/components/layout/PublicLayout'
import ArchivePage from '@/pages/Archive/ArchivePage'
import LoginPage from '@/pages/Auth/LoginPage'
import RegisterPage from '@/pages/Auth/RegisterPage'
import ContactsPage from '@/pages/Contacts/ContactsPage'
import DashboardPage from '@/pages/Dashboard/DashboardPage'
import DebtsPage from '@/pages/Debts/DebtsPage'
import FoldersPage from '@/pages/Folders/FoldersPage'
import PaymentsPage from '@/pages/Payments/PaymentsPage'
import ProfilePage from '@/pages/Profile/ProfilePage'
import LandingPage from '@/pages/Public/LandingPage'
import UsersPage from '@/pages/Users/UsersPage'
import ProtectedRoute from './components/shared/ProtextedRotues'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster position="top-center" richColors />
      <AuthInitializer>
        <BrowserRouter>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route index element={<LandingPage />} />
              <Route path="login" element={<AuthLayout />}>
                <Route index element={<LoginPage />} />
              </Route>
              <Route path="register" element={<AuthLayout />}>
                <Route index element={<RegisterPage />} />
              </Route>
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route element={<App />}>
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="debts" element={<DebtsPage />} />
                <Route path="contacts" element={<ContactsPage />} />
                <Route path="folders" element={<FoldersPage />} />
                <Route path="payments" element={<PaymentsPage />} />
                <Route path="users" element={<UsersPage />} />
                <Route path="archive" element={<ArchivePage />} />
              </Route>
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthInitializer>
    </Provider>
  </StrictMode>,
)
