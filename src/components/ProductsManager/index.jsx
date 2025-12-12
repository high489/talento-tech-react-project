import { useContext, useEffect, useState } from 'react'

import { ProductsContext } from '@app/store/context'
import { PaginationControls, ProductsList } from '@ui'

const ProductsManager = ({ pagination = true }) => {
  const {
    products,
    productsLoading,
    productsError,
    productsTotal,
    loadProducts,
    cartList,
    addToCart,
  } = useContext(ProductsContext)
  const [ page, setPage ] = useState(1)
  const limit = 12
  const skip = (page - 1) * limit
  const totalPages = Math.ceil(productsTotal / limit)

  useEffect(() => {
    if (pagination) {
      loadProducts({ limit, skip })
    } else {
      loadProducts()
    }
  }, [pagination, page, loadProducts])

  return (
    <div className='w-100 py-3 gap-3 d-flex flex-column'>
      <ProductsList
        products={products}
        productsLoading={productsLoading}
        productsError={productsError}
        onAddToCard={addToCart}
        cartList={cartList}
      />
      <PaginationControls
        page={page}
        totalPages={totalPages}
        onChange={setPage}
      />
    </div>
  )
}

export { ProductsManager }