import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { ProductsContext } from '@app/store/context'
import { ActionButton, CartControls, CartList } from '@ui'

const CarritoManager = () => {
  const navigate = useNavigate()
  const {
    cartList,
    cartTotal,
    clearCart,
    buyProducts,
  } = useContext(ProductsContext)

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
          handleBuyProducts={buyProducts}
          handleClearCart={clearCart}
        />
      </div>
    </div>
  )
}

export { CarritoManager }