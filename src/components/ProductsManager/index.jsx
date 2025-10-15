import { useContext, useEffect } from 'react'

import { ProductsContext } from '@app/store/context'
import { CartModalButton, ProductsList } from '@ui'

const ProductsManager = () => {
  const {
    products,
    productsLoading,
    productsError,
    loadProducts,
    cartList,
    cartTotal,
    clearCart,
    buyProducts,
    addToCart,
  } = useContext(ProductsContext)

  useEffect(() => {
    if (!products.length) {
      loadProducts()
    }
  }, [products, loadProducts])

  return (
    <div className='w-100 py-3 gap-3 d-flex flex-column'>
      <CartModalButton
        className='align-self-end'
        cartList={cartList}
        cartTotal={cartTotal}
        clearCart={clearCart}
        buyProducts={buyProducts}
      />

      <ProductsList
        products={products}
        productsLoading={productsLoading}
        productsError={productsError}
        onAddToCard={addToCart}
        cartList={cartList}
      />
    </div>
  )
}

export { ProductsManager }