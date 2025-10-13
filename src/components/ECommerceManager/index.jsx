import styles from './e-commerce-manager.module.css'
import { useEffect, useMemo, useState } from 'react'

import { ActionButton, Cart, ProductsList } from '@ui'
import { Modal } from 'react-bootstrap'

const ECommerceManager = () => {
  const [isShowModal, setShowModal] = useState(false)
  const toggleModal = () => setShowModal(prev => !prev)

  const [products, setProducts] = useState([])
  const [cartList, setCartList] = useState([])

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
    toggleModal()
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
            ? <div className={`d-flex justify-content-between align-items-center ${styles['cart-button-text']}`}>
                <span className=''>Carrito:</span>
                <span className=''>{cartTotal.toFixed(2)} USD</span>
              </div>
            : 'Carrito'
        }
      </ActionButton>

      <Modal show={isShowModal} onHide={toggleModal}>
        <Modal.Header className='text-bg-dark' closeButton closeVariant='white'>
          <Modal.Title className={styles['modal-title']}>Carrito</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles['modal-body']}>
          <Cart 
            cartList={cartList}
            cartTotal={cartTotal}
            onClear={clearCart}
            onBuy={buyProducts}
          />
        </Modal.Body>
        <Modal.Footer className='text-bg-dark'>
          <ActionButton 
            variant='success' 
            onClick={buyProducts}
            disabled={!cartList.length}
          >
            Comprar
          </ActionButton>
          <ActionButton variant='danger' onClick={clearCart}>
            Vaciar carrito
          </ActionButton>
        </Modal.Footer>
      </Modal>
      
      <ProductsList
        products={products}
        onAdd={addToCart}
        cartList={cartList}
      />
    </div>
  )
}

export { ECommerceManager }