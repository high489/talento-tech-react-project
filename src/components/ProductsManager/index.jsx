import { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'

import { ProductsContext } from '@app/store/context'
import { useDebounce } from '@app/hooks'
import { PaginationControls, ProductsCategorySelector, ProductsList, SearchBar } from '@ui'

const ProductsManager = ({ pagination = false }) => {
  const {
    products,
    productsLoading,
    productsError,
    productsTotal,
    loadProducts,
    cartList,
    addToCart,
    categories,
    categoriesLoading,
  } = useContext(ProductsContext)
  
  const [ category, setCategory ] = useState('')
  
  // search
  const [ searchTerm, setSearchTerm ] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 500)

  // pagination
  const [ page, setPage ] = useState(1)
  const limit = 12
  const skip = (page - 1) * limit
  const totalPages = Math.ceil(productsTotal / limit)

  useEffect(() => {
    loadProducts({
      limit: pagination ? limit : undefined,
      skip: pagination ? skip : undefined,
      search: debouncedSearch.length >= 2 ? debouncedSearch : undefined,
      category: category || undefined,
    })
  }, [pagination, page, debouncedSearch, category])

  return (
    <div className='w-100 py-3 gap-3 d-flex flex-column'>
      <Row className='g-3'>

        <Col xs={12} md={6}>
          <SearchBar
            value={searchTerm}
            onChange={(val) => {
              setSearchTerm(val)
              if (val) setCategory('')
              setPage(1)
            }}
            placeholder='Buscar productos...'
            className='w-100'
          />
        </Col>

        <Col xs={12} md={6}>
          <ProductsCategorySelector
            categories={categories}
            value={category}
            disabled={categoriesLoading}
            onChange={(val) => {
              setCategory(val)
              if (val) setSearchTerm('')
              setPage(1)
            }}
            className='w-100'
          />
        </Col>
      </Row>

      <ProductsList
        products={products}
        productsLoading={productsLoading}
        productsError={productsError}
        onAddToCard={addToCart}
        cartList={cartList}
      />

      {pagination && (
        <PaginationControls
          page={page}
          totalPages={totalPages}
          onChange={setPage}
        />
      )}
    </div>
  )
}

export { ProductsManager }