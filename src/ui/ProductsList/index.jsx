import styles from './products-list.module.css'
import { Alert, Col, Row, Spinner } from 'react-bootstrap'

import { ProductsListItem } from '@ui'

const ProductsList = ({ products, productsLoading, productsError, onAddToCard, cartList }) => {
  return (
    <>
      {productsLoading && (
        <div className='d-flex justify-content-center align-items-center my-5'>
          <Spinner animation='border' variant='primary' />
        </div>
      )}

      {productsError && (
        <Alert variant='danger' className='text-center my-4'>
          Error al cargar los productos: {productsError}
        </Alert>
      )}

      {!productsLoading && !productsError && products && (
        <Row
          className={`${styles['products-list']} g-4 align-items-stretch`}
          xs={1} md={2} lg={3}
        >
          {products.map(p => {
            const cartItem = cartList.find(c => c.id === p.id)
            const cartQuantity = cartItem ? cartItem.quantity : 0

            return (
              <Col key={p.id}>
                <ProductsListItem
                  product={p}
                  onAddToCard={onAddToCard}
                  cartQuantity={cartQuantity}
                />
              </Col>
            )
          })}
        </Row>
      )}
    </>
    
  )
}

export { ProductsList }