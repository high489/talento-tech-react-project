import { ListGroup } from 'react-bootstrap'
import styles from './cart-item.module.css'

const CartItem = ({ item }) => {
  return (
    <ListGroup.Item className={`${styles['cart-item']}`}>
      {item.name} — {item.quantity} шт. = ${item.quantity * item.price}
    </ListGroup.Item>
  )
}

export { CartItem }