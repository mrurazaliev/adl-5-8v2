import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import { store } from '@/app/store'
import { TooltipProvider } from '@/components/ui/tooltip'
import App from '@/App'
import '@/i18n'
import '@/styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <TooltipProvider>
          <Routes>
            <Route path="/" element={<App />} />
          </Routes>
          <Toaster />
        </TooltipProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
