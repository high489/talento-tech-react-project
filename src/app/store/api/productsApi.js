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

// create product
export const createProduct = async (productData) => {
  const res = await fetch(`${API_URL}/products/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData)
  })
  
  if (!res.ok) throw new Error('Failed to create product')
  
  return res.json()
}

// update product
export const updateProduct = async (id, productData) => {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData)
  })
  
  // If 404, product was created locally - return updated data with existing id
  if (res.status === 404) {
    return { id: parseInt(id), ...productData }
  }
  
  if (!res.ok) throw new Error('Failed to update product')
  
  return res.json()
}

// delete product
export const deleteProduct = async (id) => {
  try {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE'
    })
    
    console.log('Delete response status:', res.status)
    
    // 404 is OK - product might be locally created and doesn't exist on server
    if (res.status === 404) {
      console.log('Product not found on server (404), treating as successful delete')
      return { id: parseInt(id), isDeleted: true, deletedOn: new Date().toISOString() }
    }
    
    if (!res.ok) {
      throw new Error('Failed to delete product')
    }
    
    return res.json()
  } catch (err) {
    console.error('Delete error:', err)
    throw err
  }
}