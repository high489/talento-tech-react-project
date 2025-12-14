import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { ProductsContext } from '@app/store/context'
import { ActionButton, CartControls, CartList } from '@ui'

const CartManager = () => {
  const navigate = useNavigate()
  const {
    cartList,
    cartTotal,
    clearCart,
    buyProducts,
  } = useContext(ProductsContext)

  const handleBuyProducts = async () => {
    try {
      await buyProducts()
      navigate('/', { replace: true })
    } catch (err) {
      console.error('Error buying products:', err)
    }
  }

  return (
    <div className='w-100 py-3 gap-3 d-flex flex-column flex-grow-1'>
      <ActionButton
        className='w-25 align-self-start'
        variant='secondary'
        onClick={() => {navigate(-1)}}
      >
        Volver
      </ActionButton>

      <div className='flex-grow-1'>
        {
          cartList.length > 0
          ? <CartList
              cartList={cartList}
              onClear={clearCart}
              onBuy={buyProducts}
            />
          : <p className='my-2 text-center'>Carrito vacío</p>
        }
      </div>
      <div className=''>
        <CartControls
          total={cartTotal}
          isCartEmpty={!cartList.length}
          handleBuyProducts={handleBuyProducts}
          handleClearCart={clearCart}
        />
      </div>
    </div>
  )
}

export { CartManager }