import { Navigate, Outlet } from 'react-router-dom'

interface PublicRouteProps {
  isAuthenticated: boolean
}

function PublicRoute({ isAuthenticated }: PublicRouteProps) {
  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default PublicRoute
