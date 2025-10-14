import styles from './cart-list.module.css'
import { ListGroup } from 'react-bootstrap'

import { CartListItem } from '@ui'

const CartList = ({ cartList, cartTotal }) => {
  return (
    <div className={styles['cart-list']}>
      {cartList.length === 0 ? (
        <p className='my-2 text-center'>Carrito vacío</p>
      ) : (
        <>
          <ListGroup>
            {cartList.map(listItem => (
              <CartListItem key={listItem.id} product={listItem} />
            ))}
          </ListGroup>
          {cartTotal && 
          <div className='mt-2 px-1 text-end'>
            <span className={styles['total-text']}>Total: ${cartTotal.toFixed(2)}</span>
          </div>}
        </>
      )}
    </div>
  )
}

export { CartList }