import { useContext, useEffect } from 'react'

import { ProductsContext } from '@app/store/context'
import { useAuth } from '@app/hooks/ViewModel'

export const useUserCartSync = () => {
  const { user, userCart } = useAuth()
  const { products, setCartByUser } = useContext(ProductsContext)

  useEffect(() => {
    if (!user || !userCart || !products.length) return

    const mappedCart = userCart.products
      ?.map(item => {
        const product = products.find(p => p.id === item.productId)
        if (!product) return null
        return { ...product, quantity: item.quantity }
      })
      .filter(Boolean) || []

    setCartByUser(prev => ({
      ...prev,
      [user.id]: mappedCart,
    }))
  }, [user, userCart, products])
}