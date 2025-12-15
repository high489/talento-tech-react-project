import { useContext, useCallback } from 'react'
import { UsersContext } from '@app/store/context'

export const useAuth = () => {
  const {
    user,
    token,
    isAuth,
    authLoading,
    authError,
    login,
    logout,
    userCart,
    userCartLoading,
  } = useContext(UsersContext)

  const handleLogin = useCallback(async (credentials) => {
    return await login(credentials)
  }, [login])

  const handleLogout = useCallback(() => {
    logout()
  }, [logout])

  return {
    // state
    user,
    token,
    isAuth,
    authLoading,
    authError,
    // actions
    login: handleLogin,
    logout: handleLogout,
    // user cart
    userCart,
    userCartLoading,
  }
}
