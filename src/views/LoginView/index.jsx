import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '@app/hooks/ViewModel'
import { LoginForm } from '@ui'

const LoginView = () => {
  const navigate = useNavigate()
  const {
    login,
    isAuth,
    authLoading,
    authError,
  } = useAuth()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (isAuth) {
      navigate('/', { replace: true })
    }
  }, [isAuth])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login({ username, password })
    navigate('/', { replace: true })
  }

  return (
    <section className='d-flex flex-column justify-content-center align-items-center min-vh-100'>
      <LoginForm
        authLoading={authLoading}
        authError={authError}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        onSubmit={handleSubmit}
      />
    </section>   
  )
}

export { LoginView }