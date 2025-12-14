import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ProductsContext } from '@app/store/context'
import { ProductForm } from '@ui'
import { Alert, Spinner } from 'react-bootstrap'

const ProductUpdateManager = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { 
    productDetails, 
    productDetailsLoading,
    productDetailsError,
    loadProductById, 
    updateProduct 
  } = useContext(ProductsContext)
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [initialLoading, setInitialLoading] = useState(true)
  
  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    weight: '',
    width: '',
    height: '',
    depth: '',
    minimumOrderQuantity: '',
    sku: '',
    warrantyInformation: '',
    shippingInformation: '',
    returnPolicy: ''
  })

  const product = productDetails[id]

  useEffect(() => {
    const loadData = async () => {
      if (!product) {
        await loadProductById(id)
      }
      setInitialLoading(false)
    }
    loadData()
  }, [id, product, loadProductById])

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || '',
        brand: product.brand || '',
        description: product.description || '',
        price: product.price?.toString() || '',
        stock: product.stock?.toString() || '',
        category: product.category || '',
        weight: product.weight?.toString() || '',
        width: product.dimensions?.width?.toString() || '',
        height: product.dimensions?.height?.toString() || '',
        depth: product.dimensions?.depth?.toString() || '',
        minimumOrderQuantity: product.minimumOrderQuantity?.toString() || '1',
        sku: product.sku || '',
        warrantyInformation: product.warrantyInformation || '',
        shippingInformation: product.shippingInformation || '',
        returnPolicy: product.returnPolicy || ''
      })
    }
  }, [product])

  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)

    try {
      const productData = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price) || 0,
        stock: parseInt(formData.stock) || 0,
        category: formData.category,
        brand: formData.brand || 'Generic',
        weight: parseFloat(formData.weight) || 0,
        dimensions: {
          width: parseFloat(formData.width) || 0,
          height: parseFloat(formData.height) || 0,
          depth: parseFloat(formData.depth) || 0
        },
        minimumOrderQuantity: parseInt(formData.minimumOrderQuantity) || 1,
        sku: formData.sku,
        warrantyInformation: formData.warrantyInformation,
        shippingInformation: formData.shippingInformation,
        returnPolicy: formData.returnPolicy
      }

      await updateProduct(id, productData)
      navigate(`/products/${id}`)
    } catch (err) {
      setError(err.message || 'Error al actualizar el producto')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    navigate(`/products/${id}`)
  }

  if (initialLoading || productDetailsLoading) {
    return (
      <div className='d-flex justify-content-center align-items-center my-5'>
        <Spinner animation='border' variant='primary' />
      </div>
    )
  }

  if (productDetailsError || !product) {
    return (
      <Alert variant='danger' className='text-center my-4'>
        Error al cargar el producto: {productDetailsError || 'Producto no encontrado'}
      </Alert>
    )
  }

  return (
    <div className='w-100 py-3'>
      <h2 className='mb-4'>Editar producto</h2>
      <ProductForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
        error={error}
        isEditMode={true}
      />
    </div>
  )
}

export { ProductUpdateManager }