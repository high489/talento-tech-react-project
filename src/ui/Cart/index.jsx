import styles from './cart.module.css'
import { ListGroup } from 'react-bootstrap'

import { ActionButton, CartItem } from '@ui'

const Cart = ({ cartList, onClear, onBuy }) => {
  const total = cartList.reduce((sum, item) => sum + item.quantity * item.price, 0)

  return (
    <div className={`mt-4 ${styles['cart']}`}>
      <h3>Carrito</h3>
      {cartList.length === 0 ? (
        <p>Carrito vacío</p>
      ) : (
        <>
          <ListGroup>
            {cartList.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </ListGroup>
          <div className='mt-2'>
            <strong>Total: ${total}</strong>
          </div>
          <div className='d-flex gap-2 mt-3'>
            <ActionButton text='Comprar' onClick={onBuy} />
            <ActionButton text='Vaciar carrito' onClick={onClear} />
          </div>
        </>
      )}
    </div>
  )
}

export { Cart }