import { API_URL } from '@app/constants'

export const loginRequest = async ({ username, password }) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username,
      password,
      expiresInMins: 60,
    }),
  })

  if (!res.ok) {
    throw new Error('Invalid credentials')
  }

  return res.json()
}

export const fetchUserCart = async (userId) => {
  const res = await fetch(`${API_URL}/carts/user/${userId}`)

  if (!res.ok) {
    throw new Error('Failed to load user cart')
  }

  const data = await res.json()

  return data.carts?.[0] || null
}