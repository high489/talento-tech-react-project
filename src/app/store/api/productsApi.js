import { API_URL } from '@app/constants'

// fetch products with parameters: pagination, search
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

// fetch categories
export const fetchCategories = async () => {
  const res = await fetch(`${API_URL}/products/categories`)
  if (!res.ok) throw new Error('Failed to load categories')
  return res.json()
}

// fetch products by category
export const fetchProductsByCategory = async (category, { limit, skip } = {}) => {
  let url = `${API_URL}/products/category/${encodeURIComponent(category)}`

  const params = []
  if (limit !== undefined) params.push(`limit=${limit}`)
  if (skip !== undefined) params.push(`skip=${skip}`)

  if (params.length > 0) {
    url += '?' + params.join('&')
  }

  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to load products by category')
  return res.json()
}

// fetch product
export const fetchProductById = async (id) => {
  const res = await fetch(`${API_URL}/products/${id}`)
  if (!res.ok) throw new Error('Failed to load product data')

  return res.json()
}