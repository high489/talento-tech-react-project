import { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ProductsContext } from '@app/store/context'

import { ActionButton, CartModalButton, ProductDetails } from '@ui'

const ProductDetailsManager = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const {
    productDetails,
    productDetailsLoading,
    productDetailsError,
    loadProductById,
    cartList,
    cartTotal,
    clearCart,
    buyProducts,
    addToCart,
  } = useContext(ProductsContext)

  const product = productDetails[id]

  useEffect(() => {
    if (!product) {
      loadProductById(id)
    }
  }, [id, product, loadProductById])

  return (
    <div className='w-100 py-3 gap-3 d-flex flex-column'>
      <div className='p-0 d-flex justify-content-between align-items-center'>
        <ActionButton
          variant='secondary'
          onClick={() => {navigate(-1)}}
        >
          Volver
        </ActionButton>

        <CartModalButton
          cartList={cartList}
          cartTotal={cartTotal}
          clearCart={clearCart}
          buyProducts={buyProducts}
        />
      </div>
      <ProductDetails
        product={product}
        productLoading={productDetailsLoading}
        productError={productDetailsError}
        onAddToCard={addToCart}
      />
    </div>    
  )
}

export { ProductDetailsManager }