import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ProductsContext } from '@app/store/context'
import { ProductForm } from '@ui'

const ProductCreateManager = () => {
  const navigate = useNavigate()
  const { createProduct } = useContext(ProductsContext)

  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState(null)

  const [ formData, setFormData ] = useState({
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
    minimumOrderQuantity: '1',
    sku: '',
    warrantyInformation: '',
    shippingInformation: '',
    returnPolicy: ''
  })

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
      // Prepare product data
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
        sku: formData.sku || `SKU-${Date.now()}`,
        warrantyInformation: formData.warrantyInformation || 'No warranty',
        shippingInformation: formData.shippingInformation || 'Standard shipping',
        returnPolicy: formData.returnPolicy || 'No returns',
        // Generate image URL with product title
        images: [
          `https://dummyjson.com/image/400x300?text=${encodeURIComponent(formData.title || 'Product')}&fontSize=20`
        ],
        thumbnail: `https://dummyjson.com/image/200x150?text=${encodeURIComponent(formData.title || 'Product')}&fontSize=16`
      }
      const createdProduct = await createProduct(productData)
      navigate(`/products/${createdProduct.id}`, { replace: true })
    } catch (err) {
      setError(err.message || 'Error al crear el producto')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    console.log('handleCancel called!')
    navigate(-1)
  }

  return (
    <div className='w-100 py-3'>
      <h2 className='mb-4'>Añadir nuevo producto</h2>
      <ProductForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
        error={error}
        isEditMode={false}
      />
    </div>
  )
}

export { ProductCreateManager }