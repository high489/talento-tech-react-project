import styles from './products-list.module.css'
import { Col, Row } from 'react-bootstrap'

import { ProductsListItem } from '@ui'

const ProductsList = ({ products, onAddToCard, cartList }) => {
  return (
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
  )
}

export { ProductsList }