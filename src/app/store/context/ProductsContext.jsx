import { createContext, useState, useCallback, useMemo, useEffect, useContext } from 'react'
import {
  fetchProducts,
  fetchProductById,
  fetchCategories,
  fetchProductsByCategory,
  createProduct as apiCreateProduct,
  updateProduct as apiUpdateProduct,
  deleteProduct as apiDeleteProduct,
} from '../api'
import { UsersContext } from './UsersContext'

export const ProductsContext = createContext()

const CART_STORAGE_KEY = 'marketplace:carts'

export const ProductsProvider = ({ children }) => {
  const { user } = useContext(UsersContext)
  const userId = user?.id

  // local-only products (created in this session)
  const [localProducts, setLocalProducts] = useState([])
  const [deletedProductIds, setDeletedProductIds] = useState([])

  // main source of truth for UI
  const [products, setProducts] = useState([])
  const [productsLoading, setProductsLoading] = useState(false)
  const [productsError, setProductsError] = useState(null)
  const [productsTotal, setProductsTotal] = useState(0)

  // load products
  const loadProducts = useCallback(async ({ limit, skip, search, category } = {}) => {
    setProductsLoading(true)
    setProductsError(null)
  
    try {
      let data
      if (category !== undefined) {
        data = await fetchProductsByCategory(category, { limit, skip })
      } else {
        data = await fetchProducts({ limit, skip, search })
      }
  
      const localIds = new Set(localProducts.map(p => p.id))
  
      const apiProducts = (data.products || []).filter(
        p =>
          !deletedProductIds.includes(p.id) &&
          !localIds.has(p.id)
      )
  
      let filteredLocalProducts = localProducts
  
      if (search) {
        const s = search.toLowerCase()
        filteredLocalProducts = filteredLocalProducts.filter(p =>
          p.title?.toLowerCase().includes(s) ||
          p.description?.toLowerCase().includes(s) ||
          p.brand?.toLowerCase().includes(s)
        )
      }
  
      if (category !== undefined) {
        filteredLocalProducts = filteredLocalProducts.filter(
          p => p.category === category
        )
      }
      setProducts([...filteredLocalProducts, ...apiProducts])
  
      setProductsTotal(
        filteredLocalProducts.length + (data.total ?? apiProducts.length)
      )
    } catch (err) {
      setProductsError(err.message)
    } finally {
      setProductsLoading(false)
    }
  }, [localProducts, deletedProductIds])
  

  // categories
  const [categories, setCategories] = useState([])
  const [categoriesLoading, setCategoriesLoading] = useState(false)
  const [categoriesError, setCategoriesError] = useState(null)

  const loadCategories = async () => {
    setCategoriesLoading(true)
    try {
      const cats = await fetchCategories()
      setCategories(cats)
    } catch (err) {
      setCategoriesError(err.message)
    } finally {
      setCategoriesLoading(false)
    }
  }

  // single product details
  const [productDetails, setProductDetails] = useState({})
  const [productDetailsLoading, setProductDetailsLoading] = useState(false)
  const [productDetailsError, setProductDetailsError] = useState(null)

  const loadProductById = useCallback(async (id) => {
    const productId = parseInt(id)
    setProductDetailsError(null)
  
    if (deletedProductIds.includes(productId)) {
      setProductDetailsError('Producto eliminado')
      return null
    }
  
    const localProduct = localProducts.find(p => p.id === productId)
    if (localProduct) {
      setProductDetails(prev => ({ ...prev, [id]: localProduct }))
      return localProduct
    }
  
    if (productDetails[id]) {
      return productDetails[id]
    }
  
    setProductDetailsLoading(true)
    try {
      const product = await fetchProductById(productId)
  
      if (!product) {
        throw new Error('Not found')
      }
  
      setProductDetails(prev => ({ ...prev, [id]: product }))
      return product
    } catch (err) {
      setProductDetailsError('Failed to load product data')
      return null
    } finally {
      setProductDetailsLoading(false)
    }
  }, [localProducts, productDetails, deletedProductIds])
  

  const [localIdCounter, setLocalIdCounter] = useState(-1)
  // create product
  const createProduct = useCallback(async (productData) => {
    const apiProduct = await apiCreateProduct(productData)
  
    const localId = localIdCounter
  
    const productWithDefaults = {
      ...apiProduct,
      id: localId,
      dimensions: apiProduct.dimensions || { width: 0, height: 0, depth: 0 },
      weight: apiProduct.weight || 0,
      images: apiProduct.images || [],
      thumbnail: apiProduct.thumbnail || '',
      isLocal: true,
    }
  
    setLocalIdCounter(prev => prev - 1)
  
    setLocalProducts(prev => [productWithDefaults, ...prev])
    setProducts(prev => [productWithDefaults, ...prev])
    setProductsTotal(prev => prev + 1)
    setProductDetails(prev => ({
      ...prev,
      [localId]: productWithDefaults,
    }))
  
    return productWithDefaults
  }, [localIdCounter])

  // update product
  const updateProduct = useCallback(async (id, productData) => {
    const productId = parseInt(id)
    const local = localProducts.find(p => p.id === productId)

    if (local) {
      const updated = { ...local, ...productData }

      setLocalProducts(prev => prev.map(p => p.id === productId ? updated : p))
      setProducts(prev => prev.map(p => p.id === productId ? updated : p))
      setProductDetails(prev => ({ ...prev, [id]: updated }))

      return updated
    }

    const updatedProduct = await apiUpdateProduct(id, productData)

    setProducts(prev => prev.map(p => p.id === productId ? updatedProduct : p))
    setProductDetails(prev => ({ ...prev, [id]: updatedProduct }))

    return updatedProduct
  }, [localProducts])

  // delete product
  const deleteProduct = useCallback(async (id) => {
    const productId = parseInt(id)

    await apiDeleteProduct(id)

    setDeletedProductIds(prev => [...prev, productId])
    setLocalProducts(prev => prev.filter(p => p.id !== productId))
    setProducts(prev => prev.filter(p => p.id !== productId))
    setProductsTotal(prev => prev - 1)
    setProductDetails(prev => {
      const next = { ...prev }
      delete next[id]
      return next
    })
    setCartList(prev => prev.filter(item => item.id !== productId))

    return true
  }, [])

  // cart
  const [cartByUser, setCartByUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || {}
    } catch {
      return {}
    }
  })

  const cartList = useMemo(
    () => (userId ? cartByUser[userId] || [] : []),
    [cartByUser, userId]
  )

  const [cartOwnerId, setCartOwnerId] = useState(null)

  const addToCart = useCallback((productId) => {
    if (!userId) return

    setCartByUser(prev => {
      const userCart = prev[userId] || []
      const product = products.find(p => p.id === productId)
      if (!product) return prev

      const existing = userCart.find(i => i.id === productId)
      const qty = existing ? existing.quantity : 0
      if (qty >= product.stock) return prev

      const updatedCart = existing
        ? userCart.map(i =>
            i.id === productId
              ? { ...i, quantity: i.quantity + 1 }
              : i
          )
        : [...userCart, { ...product, quantity: 1 }]

      return {
        ...prev,
        [userId]: updatedCart,
      }
    })
  }, [products, userId])

  const clearCart = useCallback(() => {
    if (!userId) return
    setCartByUser(prev => ({ ...prev, [userId]: [] }))
  }, [userId])

  // buy products from cart
  const buyProducts = useCallback(() => {
    if (!cartList.length) {
      alert('Carrito vacío')
      return
    }

    setLocalProducts(prev => {
      const map = new Map(prev.map(p => [p.id, p]))
      cartList.forEach(item => {
        const existing = map.get(item.id) || products.find(p => p.id === item.id)
        if (!existing) return
        map.set(item.id, {
          ...existing,
          stock: Math.max(0, existing.stock - item.quantity),
        })
      })
      return Array.from(map.values())
    })

    clearCart()
    alert('¡Compra exitosa!')
  }, [cartList, products, clearCart])
  

  const cartTotal = useMemo(
    () => cartList.reduce((sum, i) => sum + i.quantity * i.price, 0),
    [cartList]
  )

  useEffect(() => {
    loadCategories()
  }, [])

  useEffect(() => {
    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(cartByUser)
    )
  }, [cartByUser])

  return (
    <ProductsContext.Provider
      value={{
        products,
        productsLoading,
        productsError,
        productsTotal,
        loadProducts,
        categories,
        categoriesLoading,
        categoriesError,
        productDetails,
        productDetailsLoading,
        productDetailsError,
        loadProductById,
        createProduct,
        updateProduct,
        deleteProduct,
        cartList,
        setCartByUser,
        cartOwnerId,
        setCartOwnerId,
        cartTotal,
        addToCart,
        clearCart,
        buyProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}