import styles from './cart-modal-button.module.css'
import { useState } from 'react'
import { ActionButton, CartList } from '@ui'
import { Modal } from 'react-bootstrap'

const CartModalButton = ({ cartList = [], cartTotal = 0, clearCart, buyProducts, className }) => {
  const [ isShowModal, setShowModal ] = useState(false)
  const toggleModal = () => setShowModal(prev => !prev)

  const hasItems = cartList.length > 0

  const handleClearCart = () => {
    clearCart()
    toggleModal()
  }

  const handleBuyProducts = () => {
    buyProducts()
    toggleModal()
  }

  return (
    <>
      <ActionButton
        onClick={toggleModal}
        className={`${styles['cart-button']} ${className}`}
        variant={hasItems ? 'primary' : 'secondary'}
      >
        {hasItems ? (
          <div className='d-flex justify-content-center gap-1 align-items-center'>
            <span>Carrito:</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
        ) : (
          'Carrito'
        )}
      </ActionButton>

      <Modal
        show={isShowModal}
        onHide={toggleModal}
        centered
        size='lg'
        scrollable
        keyboard
      >
        <Modal.Header className='text-bg-dark' closeButton closeVariant='white'>
          <Modal.Title className={styles['modal-title']}>Carrito</Modal.Title>
        </Modal.Header>

        <Modal.Body className={styles['modal-body']}>
          <CartList
            cartList={cartList}
            onClear={clearCart}
            onBuy={buyProducts}
          />
        </Modal.Body>

        <Modal.Footer className='text-bg-dark d-flex justify-content-between'>
          <span className={styles['modal-total']}>
            Total: ${cartTotal.toFixed(2)}
          </span>

          <div className='w-50 d-flex justify-content-end gap-2'>
            <ActionButton
              variant='success'
              className='w-50'
              onClick={handleBuyProducts}
              disabled={!cartList.length}
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
        </Modal.Footer>
      </Modal>
    </>
  )
}

export { CartModalButton }