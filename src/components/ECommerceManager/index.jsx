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
        className={styles['cart-button']}
        customStyle={{
          alignSelf: 'flex-end',
          width: '250px',
          height: '50px',
          padding: '10px 20px',
        }}
        variant={cartList.length ? 'primary' : 'secondary'}
      >
        {cartList.length ? `Carrito: ${cartTotal.toFixed(2)} USD` : 'Carrito'}
      </ActionButton>

      <Modal show={isShowModal} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Carrito</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Cart 
            cartList={cartList}
            cartTotal={cartTotal}
            onClear={clearCart}
            onBuy={buyProducts}
          />
        </Modal.Body>
        <Modal.Footer>
          <ActionButton 
            variant='primary' 
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