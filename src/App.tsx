import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'

import { ConfigProvider } from 'antd'
import ptBR from 'antd/locale/pt_BR'

import ProtectedRoute from './routes/guards/ProtectedRoute'
import PublicRoute from './routes/guards/PublicRoute'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import LoadingPage from './pages/LoadingPage'
import { BookPage } from './pages/BookPage'

import { useAuthSession } from './hooks/useAuthSession'

import DefaultLayout from './routes/layouts/DefaultLayout'
import CleanLayout from './routes/layouts/CleanLayout'
import { Offline } from './components/Offline'

function App() {
  const { isAuthenticated, authLoading } = useAuthSession()

  if (authLoading) return <LoadingPage />

  return (
    <ConfigProvider
      locale={ptBR}
      form={{
        validateMessages: {
          required: 'Este campo é obrigatório',
        },
      }}
    >
      <Offline />
      <BrowserRouter>
        <Routes>

          {/* HOME (layout padrão) */}
          <Route element={<DefaultLayout />}>
            <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/" element={<HomePage />} />
            </Route>
          </Route>

          {/* CLEAN LAYOUT */}
          <Route element={<CleanLayout />}>

            {/* ROTAS PÚBLICAS */}
            <Route element={<PublicRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>

            {/* ROTAS PROTEGIDAS */}
            <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/book/:id" element={<BookPage />} />
            </Route>

          </Route>

          {/* FALLBACK */}
          <Route
            path="*"
            element={
              <Navigate to={isAuthenticated ? '/' : '/login'} replace />
            }
          />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App