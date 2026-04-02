import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import ProtectedRoute from './routes/guards/ProtectedRoute'
import PublicRoute from './routes/guards/PublicRoute'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { useAuthSession } from './hooks/useAuthSession'
import DefaultLayout from './routes/layouts/DefaultLayout'
import CleanLayout from './routes/layouts/CleanLayout'
import LoadingPage from './pages/LoadingPage'

function App() {
  const { isAuthenticated, authLoading } = useAuthSession()

  if (authLoading) return <LoadingPage />

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/" element={<HomePage />} />
          </Route>
        </Route>

        <Route element={<CleanLayout />}>
          <Route element={<PublicRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to={isAuthenticated ? '/' : '/login'} replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
