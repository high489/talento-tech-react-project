import styles from './cart.module.css'
import { ListGroup } from 'react-bootstrap'

import { CartItem } from '@ui'

const Cart = ({ cartList, cartTotal }) => {
  return (
    <div className={`mt-4 ${styles['cart']}`}>
      {cartList.length === 0 ? (
        <p className='text-center'>Carrito vacío</p>
      ) : (
        <>
          <ListGroup>
            {cartList.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </ListGroup>
          <div className='mt-2 px-1 text-end'>
            <span className='fw-semibold'>Total: {cartTotal.toFixed(2)} USD</span>
          </div>
        </>
      )}
    </div>
  )
}

export { Cart }