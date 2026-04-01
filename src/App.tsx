import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import { Layout } from 'antd'
import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'
import ProtectedRoute from './routes/guards/ProtectedRoute'
import PublicRoute from './routes/guards/PublicRoute'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { useAuthSession } from './hooks/useAuthSession'

const { Content } = Layout

function DefaultLayout() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppHeader />
      <Content style={{ backgroundColor: '#fafafa', padding: 25, marginBottom: '70px' }}>
        <Outlet />
      </Content>
      <AppFooter />
    </Layout>
  )
}

function CleanLayout() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ backgroundColor: '#fafafa', padding: 25 }}>
        <Outlet />
      </Content>
    </Layout>
  )
}

function App() {
  const { isAuthenticated, authLoading } = useAuthSession()

  if (authLoading) return <div>Carregando...</div>

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
