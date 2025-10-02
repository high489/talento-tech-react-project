import styles from './products-list-item.module.css'
import { Card } from 'react-bootstrap'

import { ActionButton } from '@ui'

const ProductsListItem = ({ product, onAdd, cartQuantity }) => {
  const isOutOfStock = cartQuantity >= product.stock

  return (
    <Card className={`${styles['products-list-item']}`}>
      <Card.Img
        variant='top'
        src={product.image}
        className={styles['cart-image']}
      />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Card.Text>Disponible: {product.stock - cartQuantity}</Card.Text>
        <Card.Text>Precio: {product.price} USD</Card.Text>
        <ActionButton
          onClick={() => onAdd(product.id)}
          style={{ width: '100%' }}
          disabled={isOutOfStock}
        >
          {isOutOfStock ? 'No disponible' : 'Agregar al carrito'}
        </ActionButton>
      </Card.Body>
    </Card>
  )
}

export { ProductsListItem }