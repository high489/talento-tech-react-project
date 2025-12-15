import { createContext, useCallback, useEffect, useMemo, useState } from 'react'

import { loginRequest, fetchUserCart } from '../api'

export const UsersContext = createContext()

const STORAGE_KEY = 'auth_user'

export const UsersProvider = ({ children }) => {
  // current user
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  const [authLoading, setAuthLoading] = useState(false)
  const [authError, setAuthError] = useState(null)

  // user cart
  const [userCart, setUserCart] = useState(null)
  const [userCartLoading, setUserCartLoading] = useState(false)

  // restore session
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      setUser(parsed.user)
      setToken(parsed.token)
    }
  }, [])

  // login
  const login = useCallback(async (credentials) => {
    setAuthLoading(true)
    setAuthError(null)

    try {
      const data = await loginRequest(credentials)

      const authData = {
        user: data,
        token: data.token,
      }

      setUser(data)
      setToken(data.token)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(authData))

      // load user cart
      setUserCartLoading(true)
      const cart = await fetchUserCart(data.id)
      setUserCart(cart)
      setUserCartLoading(false)

      return data
    } catch (err) {
      setAuthError(err.message)
      throw err
    } finally {
      setAuthLoading(false)
    }
  }, [])

  // logout
  const logout = useCallback(() => {
    setUser(null)
    setToken(null)
    setUserCart(null)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  const isAuth = !!user

  const value = useMemo(() => ({
    user,
    token,
    isAuth,
    authLoading,
    authError,
    login,
    logout,
    userCart,
    userCartLoading,
  }), [
    user,
    token,
    isAuth,
    authLoading,
    authError,
    login,
    logout,
    userCart,
    userCartLoading,
  ])

  return (
    <UsersContext.Provider value={value}>
      {children}
    </UsersContext.Provider>
  )
}