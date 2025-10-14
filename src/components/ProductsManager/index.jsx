import styles from './products-manager.module.css'
import { useEffect, useMemo, useState } from 'react'

import { ActionButton, CartList, ProductsList } from '@ui'
import { Modal } from 'react-bootstrap'

const ProductsManager = () => {
  const [isShowModal, setShowModal] = useState(false)
  const toggleModal = () => setShowModal(prev => !prev)

  const [ products, setProducts ] = useState([])
  const [ cartList, setCartList ] = useState([])

  const cartTotal = useMemo(() => {
    return cartList.reduce((sum, item) => sum + item.quantity * item.price, 0)
  }, [cartList])

  useEffect(() => {
    //fetch('https://dummyjson.com/products/category/groceries?limit=10&skip=5')
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
  }, [])

  const addToCart = (productId) => {
    const product = products.find((p) => p.id === productId)
    if (!product) return

    const existing = cartList.find((item) => item.id === productId)
    const currentQuantity = existing ? existing.quantity : 0

    if (currentQuantity < product.stock) {
      if (existing) {
        setCartList((prev) =>
          prev.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        )
      } else {
        setCartList((prev) => [...prev, { ...product, quantity: 1 }])
      }
    } else {
      alert('Cantidad no disponible')
    }
  }

  const clearCart = () => {
    setCartList([])
  }

  const buyProducts = () => {
    if (cartList.length === 0) {
      alert('Carrito vacío')
      return
    }

    setProducts(prevProducts =>
      prevProducts.map(p => {
        const item = cartList.find(c => c.id === p.id)
        return item ? { ...p, stock: p.stock - item.quantity } : p
      })
    )

    toggleModal()
    setCartList([])
    alert('¡Compra exitosa!')
  }

  return (
    <div className='w-100 py-3 gap-3 d-flex flex-column'>
      <ActionButton 
        onClick={toggleModal}
        className={`align-self-end d-flex justify-content-center align-items-center
          ${styles['cart-button']}`}
        variant={cartList.length ? 'primary' : 'secondary'}
      >
        {
          cartList.length
            ? <div className='d-flex justify-content-center gap-1 align-items-center'>
                <span>Carrito:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            : 'Carrito'
        }
      </ActionButton>

      <Modal 
        show={isShowModal}
        onHide={toggleModal} 
        centered 
        size='lg'
        scrollable={true}
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
          <span className={styles['modal-total']}>Total: ${cartTotal.toFixed(2)}</span>
          <div className='w-50 d-flex justify-content-end gap-2'>
            <ActionButton
              variant='success'
              className='w-50'
              onClick={buyProducts}
              disabled={!cartList.length}
            >
              Comprar
            </ActionButton>
            <ActionButton
              variant='danger'
              className='w-50'
              onClick={clearCart}
            >
              Vaciar
            </ActionButton>
          </div>
          
        </Modal.Footer>
      </Modal>
      
      <ProductsList
        products={products}
        onAddToCard={addToCart}
        cartList={cartList}
      />
    </div>
  )
}

export { ProductsManager }