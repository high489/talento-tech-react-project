import styles from './cart-controls.module.css'

import { ActionButton } from '@ui'

const CartControls = ({ total, isCartEmpty, handleBuyProducts, handleClearCart }) => {
  return (
    <div className='d-flex justify-content-between align-items-center'>
      <span className={styles['cart-controls-total']}>
        Total: ${total.toFixed(2)}
      </span>

      <div className='w-50 d-flex justify-content-end gap-2'>
        <ActionButton
          variant='success'
          className='w-50'
          onClick={handleBuyProducts}
          disabled={isCartEmpty}
        >
          Comprar
        </ActionButton>
        <ActionButton
          variant='danger'
          className='w-50'
          onClick={handleClearCart}
        >
          Vaciar
        </ActionButton>
      </div>
    </div>
  )
}

export { CartControls }