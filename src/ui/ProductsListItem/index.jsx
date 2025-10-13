import styles from './products-list-item.module.css'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { ActionButton } from '@ui'

const ProductsListItem = ({ product, onAdd, cartQuantity }) => {
  const isOutOfStock = cartQuantity >= product.stock

  return (
    <Card className={`h-100 d-flex flex-column ${styles['products-list-item']}`}>
      <Link to={`/e-commerce-app/${product.id}`}>
        <Card.Img
          src={product.thumbnail}
          alt={product.title}
          variant='top'
          className={styles['product-image']}
        />
      </Link>

      <Card.Body className='d-flex flex-column'>
        <div className='d-flex flex-column'>
          <Card.Title
            as={Link} to={`/e-commerce-app/${product.id}`}
            className={`mb-1 ${styles['product-title']}`}
          >
            {product.title}
          </Card.Title>
          <Card.Subtitle 
            className={`mb-3 text-muted ${styles['product-brand']}`}
          >
            {product.brand}
          </Card.Subtitle>
          <Card.Text
            className={`mb-3 text-muted ${styles['product-description']}`}
          >
            {product.description}
          </Card.Text>
        </div>
        <div className='mt-auto gap-1 d-flex flex-column'>
          <div className={`w-100 d-flex justify-content-between align-items-center
            ${styles['product-info']}`}>
            <Card.Text className='m-0'>Disponible: {product.stock - cartQuantity}</Card.Text>
            <Card.Text className='m-0'>Precio: {product.price} USD</Card.Text>
          </div>
          <ActionButton
            onClick={() => onAdd(product.id)}
            className='w-100'
            disabled={isOutOfStock}
          >
            {isOutOfStock ? 'No disponible' : 'Agregar al carrito'}
          </ActionButton>
        </div>
      </Card.Body>
    </Card>
  )
}

export { ProductsListItem }