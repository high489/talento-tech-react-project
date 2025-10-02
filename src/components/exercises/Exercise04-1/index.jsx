import { Cart, ProductsList } from '@ui'
import styles from './exercise04-1.module.css'
import { useState } from 'react'

const mockProducts = [
  {
    id: 1,
    name: 'Microsoft Surface Laptop',
    description: 'Windows Laptop potente para trabajo y juegos',
    stock: 5,
    price: 1200,
    image: 'https://picsum.photos/seed/1/400/300'
  },
  {
    id: 2,
    name: 'Smartphone Apple iPhone 16',
    description: 'Smartphone inteligente moderno con una excelente cámara',
    stock: 10,
    price: 1000,
    image: 'https://picsum.photos/seed/2/400/300'
  },
  {
    id: 3,
    name: 'Auriculares Marshall Major V',
    description: 'Auriculares Bluetooth inalámbricos con cancelación de ruido',
    stock: 15,
    price: 200,
    image: 'https://picsum.photos/seed/4/400/300'
  }
]

const Exercise04_1 = () => {
  const [products, setProducts] = useState(mockProducts)
  const [cartList, setCartList] = useState([])

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

    setCartList([])
    alert('¡Compra exitosa!')
  }

  return (
    <div className={`${styles['exercise04-1']}`}>
      <Cart 
        cartList={cartList}
        onClear={clearCart}
        onBuy={buyProducts}
      />
      <ProductsList
        products={products}
        onAdd={addToCart}
        cartList={cartList}
      />
    </div>
  )
}

export { Exercise04_1 }