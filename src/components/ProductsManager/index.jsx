import { useContext, useEffect } from 'react'

import { ProductsContext } from '@app/store/context'
import { CartButton, ProductsList } from '@ui'

const ProductsManager = () => {
  const {
    products,
    productsLoading,
    productsError,
    loadProducts,
    cartList,
    addToCart,
  } = useContext(ProductsContext)

  useEffect(() => {
    if (!products.length) {
      loadProducts()
    }
  }, [products, loadProducts])

  return (
    <div className='w-100 py-3 gap-3 d-flex flex-column'>
      <CartButton className='align-self-end'/>

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