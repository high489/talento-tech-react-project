import { API_URL } from '@app/constants'

export const fetchProducts = async ({ limit, skip, search } = {}) => {
  let url = `${API_URL}/products`

  if (search) {
    url += `/search?q=${encodeURIComponent(search)}`
  }

  const params = []

  if (limit !== undefined) params.push(`limit=${limit}`)
  if (skip !== undefined) params.push(`skip=${skip}`)

  if (params.length > 0) {
    url += (search ? '&' : '?') + params.join('&')
  }

  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to load products')

  return res.json()
}

export const fetchProductById = async (id) => {
  const res = await fetch(`${API_URL}/products/${id}`)
  if (!res.ok) throw new Error('Failed to load product data')

  return res.json()
}