import { ProductDetails } from '@ui'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ProductDetailsManager = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
  }, [id])

  if (!product) return null

  return (
    <>
      <ProductDetails
        product={product}
        onAdd={() => {}}
      />
    </>    
  )
}

export { ProductDetailsManager }