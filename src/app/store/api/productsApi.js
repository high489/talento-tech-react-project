import { API_URL } from '@app/constants'

export const fetchProducts = async ({ limit, skip } = {}) => {
  let url = `${API_URL}/products`
  if (limit !== undefined && skip !== undefined) {
    url += `?limit=${limit}&skip=${skip}`
  }

  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to load all products')

  return res.json()
}

export const fetchProductById = async (id) => {
  const res = await fetch(`${API_URL}/products/${id}`)
  if (!res.ok) throw new Error('Failed to load product data')

  return res.json()
}