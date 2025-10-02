import styles from './products-list.module.css'
import { Col, Row } from 'react-bootstrap'

import { ProductsListItem } from '@ui'

const ProductsList = ({ products, onAdd, cartList }) => {
  return (
    <div className={`${styles['products-list']}`}>
      <Row>
        {products.map(p => {
          const cartItem = cartList.find(c => c.id === p.id)
          const cartQuantity = cartItem ? cartItem.quantity : 0

          return (
            <Col key={p.id} sm={12} md={6} lg={4} className='mb-3'>
              <ProductsListItem
                product={p}
                onAdd={onAdd}
                cartQuantity={cartQuantity}
              />
            </Col>
          )
        })}
      </Row>
    </div>
  )
}

export { ProductsList }