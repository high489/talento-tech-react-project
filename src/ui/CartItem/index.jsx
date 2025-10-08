import { ListGroup } from 'react-bootstrap'
import styles from './cart-item.module.css'

const CartItem = ({ item }) => {
  return (
    <ListGroup.Item className={`${styles['cart-item']}`}>
      <div className='d-flex justify-content-between'>
        <span>{item.title}</span>
        <span>{item.quantity} {item.quantity > 1 ? 'uds.' : 'ud.'} - {(item.quantity * item.price).toFixed(2)} USD</span>
      </div>
    </ListGroup.Item>
  )
}

export { CartItem }