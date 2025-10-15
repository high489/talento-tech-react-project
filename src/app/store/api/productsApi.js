import { API_URL } from '@app/constants'

export const fetchAllProducts = async (limit = 30) => {
  const res = await fetch(`${API_URL}/products?limit=${limit}`)
  if (!res.ok) throw new Error('Failed to load all products')
  const data = await res.json()

  return data.products
}

export const fetchProductById = async (id) => {
  const res = await fetch(`${API_URL}/products/${id}`)
  if (!res.ok) throw new Error('Failed to load product data')

  return res.json()
}