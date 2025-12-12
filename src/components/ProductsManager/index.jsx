import { useContext, useEffect, useState } from 'react'

import { ProductsContext } from '@app/store/context'
import { useDebounce } from '@app/hooks'
import { PaginationControls, ProductsList, SearchBar } from '@ui'

const ProductsManager = ({ pagination = false }) => {
  const {
    products,
    productsLoading,
    productsError,
    productsTotal,
    loadProducts,
    cartList,
    addToCart,
  } = useContext(ProductsContext)
  
  // search params
  const [ searchTerm, setSearchTerm ] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 500)

  // pagination params
  const [ page, setPage ] = useState(1)
  const limit = 12
  const skip = (page - 1) * limit
  const totalPages = Math.ceil(productsTotal / limit)

  // reset to first page when search changes
  useEffect(() => {
    setPage(1)
  }, [debouncedSearch])

  // load products
  useEffect(() => {
    if (pagination) {
      loadProducts({
        limit,
        skip,
        search: debouncedSearch.length >= 2 ? debouncedSearch : undefined
      })
    } else {
      loadProducts({
        search: debouncedSearch.length >= 2 ? debouncedSearch : undefined
      })
    }
  }, [pagination, page, debouncedSearch, loadProducts])

  return (
    <div className='w-100 py-3 gap-3 d-flex flex-column'>
      <SearchBar
        className='align-self-end'
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder='Buscar productos...'
      />
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