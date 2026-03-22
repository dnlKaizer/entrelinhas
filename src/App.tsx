import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import { Layout } from 'antd'
import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

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
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          {/* Colocar aqui as rotas específicas para o layout padrão */}
          <Route path="/" element={<HomePage />} />
        </Route>

        <Route element={<CleanLayout />}>
          {/* Colocar aqui as rotas para o layout limpo */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
