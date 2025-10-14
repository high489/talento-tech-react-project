import styles from './cart-list-item.module.css'
import { ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const CartListItem = ({ product }) => {
  return (
    <ListGroup.Item className={`${styles['cart-list-item']}`}>
      <div className='d-flex justify-content-between align-items-center gap-2'>
        <h3 className={styles['item-title']}>
          <Link
            to={`/products/${product.id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            {product.title}
          </Link>
        </h3>
        <span className={`d-flex justify-content-between
          ${styles['item-info']}`}>
          <span>{product.quantity} {product.quantity > 1 ? 'uds.' : 'ud.'}</span>
          <span>${(product.quantity * product.price).toFixed(2)}</span>
        </span>
      </div>
    </ListGroup.Item>
  )
}

export { CartListItem }