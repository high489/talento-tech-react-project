import { createContext, useState, useCallback, useMemo } from 'react'
import { fetchProducts, fetchProductById } from '../api'

export const ProductsContext = createContext()

export const ProductsProvider = ({ children }) => {
  // all products
  const [products, setProducts] = useState([])
  const [productsLoading, setProductsLoading] = useState(false)
  const [productsError, setProductsError] = useState(null)
  const [productsTotal, setProductsTotal] = useState(0)

  const loadProducts = useCallback(async ({ limit, skip } = {}) => {
    setProductsLoading(true)
    setProductsError(null)

    try {
      const { products, total } = await fetchProducts({ limit, skip })
      setProducts(products)
      setProductsTotal(total)
    } catch (err) {
      setProductsError(err.message)
    } finally {
      setProductsLoading(false)
    }
  }, [])

  // single product by id
  const [productDetails, setProductDetails] = useState({})
  const [productDetailsLoading, setProductDetailsLoading] = useState(false)
  const [productDetailsError, setProductDetailsError] = useState(null)

  const loadProductById = useCallback(async (id) => {
    if (productDetails[id]) return productDetails[id]

    setProductDetailsLoading(true)
    setProductDetailsError(null)
    try {
      const product = await fetchProductById(id)
      setProductDetails(prev => ({ ...prev, [id]: product }))
      return product
    } catch (err) {
      setProductDetailsError(err.message)
      return null
    } finally {
      setProductDetailsLoading(false)
    }
  }, [productDetails])

  // cart
  const [cartList, setCartList] = useState([])

  const addToCart = useCallback((productId) => {
    const product = products.find((p) => p.id === productId)
    if (!product) return

    const existing = cartList.find((item) => item.id === productId)
    const currentQuantity = existing ? existing.quantity : 0

    if (currentQuantity < product.stock) {
      if (existing) {
        setCartList((prev) =>
          prev.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        )
      } else {
        setCartList((prev) => [...prev, { ...product, quantity: 1 }])
      }
    } else {
      alert('Cantidad no disponible')
    }
  }, [products, cartList])

  const clearCart = useCallback(() => {
    setCartList([])
  }, [])

  const buyProducts = useCallback(() => {
    if (cartList.length === 0) {
      alert('Carrito vacío')
      return
    }
  
    setProducts(prevProducts =>
      prevProducts.map(p => {
        const item = cartList.find(c => c.id === p.id)
        return item ? { ...p, stock: p.stock - item.quantity } : p
      })
    )
  
    setProductDetails(prevDetails => {
      const updatedDetails = { ...prevDetails }
      cartList.forEach(item => {
        if (updatedDetails[item.id]) {
          updatedDetails[item.id] = {
            ...updatedDetails[item.id],
            stock: updatedDetails[item.id].stock - item.quantity,
          }
        }
      })
      return updatedDetails
    })
  
    clearCart()
    alert('¡Compra exitosa!')
  }, [cartList, clearCart])

  const cartTotal = useMemo(() => {
    return cartList.reduce((sum, item) => sum + item.quantity * item.price, 0)
  }, [cartList])
  
  return (
    <ProductsContext.Provider
      value={{
        // all products
        products,
        productsLoading,
        productsError,
        productsTotal,
        loadProducts,
        // single product by id
        productDetails,
        productDetailsLoading,
        productDetailsError,
        loadProductById,
        // cart
        cartList,
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