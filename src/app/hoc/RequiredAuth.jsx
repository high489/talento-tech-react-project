import { Navigate, useLocation } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'

import { useAuth } from '@app/hooks/ViewModel'

const RequiredAuth = ({ children }) => {
  const { isAuth, authLoading } = useAuth()
  const location = useLocation()

  if (authLoading) {
    return (
      <div className='d-flex flex-column align-items-center mb-3'>
        <Spinner animation='border' />
      </div>
    )
  }

  if (!isAuth) {
    return (
      <Navigate
        to='/login'
        replace
        state={{ from: location }}
      />
    )
  }

  return children
}

export { RequiredAuth }