import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ProductsContext } from '@app/store/context'

import { ActionButton, ProductDetails } from '@ui'

const ProductDetailsManager = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const {
    productDetails,
    productDetailsLoading,
    productDetailsError,
    loadProductById,
    cartList,
    addToCart,
    deleteProduct,
  } = useContext(ProductsContext)

  const [deleting, setDeleting] = useState(false)

  const product = productDetails[id]
  const cartItem = product
    ? cartList.find(c => c.id === product.id)
    : null
  const cartQuantity = cartItem ? cartItem.quantity : 0

  useEffect(() => {
    if (!product) {
      loadProductById(id)
    }
  }, [id, product, loadProductById])

  useEffect(() => {
    if (product && productDetailsError) {
      loadProductById(id)
    }
  }, [product, productDetailsError, id, loadProductById])

  const handleEdit = () => {
    navigate(`/products/${id}/update`)
  }

  const handleDelete = async () => {
    const confirmed = window.confirm('¿Está seguro de que desea eliminar este producto?')
    if (!confirmed) return

    setDeleting(true)
    try {
      await deleteProduct(id)
      navigate('/')
    } catch (err) {
      alert('Error al eliminar el producto: ' + err.message)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className='w-100 py-3 gap-3 d-flex flex-column'>
      <ActionButton
        className='w-25 align-self-start'
        variant='secondary'
        onClick={() => {navigate(-1)}}
      >
        Volver
      </ActionButton>

      <ProductDetails
        product={product}
        productLoading={productDetailsLoading}
        productError={productDetailsError}
        onAddToCard={addToCart}
        cartQuantity={cartQuantity}
      />

      {!productDetailsLoading && !productDetailsError && product && (
        <div className='d-flex gap-3 justify-content-end mt-3'>
          <ActionButton
            variant='warning'
            onClick={handleEdit}
          >
            Editar producto
          </ActionButton>
          <ActionButton
            variant='danger'
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? 'Eliminando...' : 'Eliminar producto'}
          </ActionButton>
        </div>
      )}
    </div>    
  )
}

export { ProductDetailsManager }