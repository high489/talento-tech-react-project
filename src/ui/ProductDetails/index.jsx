import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const ProductDetails = ({ product }) => {
  const navigate = useNavigate()

  return (
    <>
      <div>{product.id} - {product.title}</div>
      <Button variant="secondary" onClick={() => {navigate(-1)}} className="mt-3">
        Volver
      </Button>
    </>
  )
}

export { ProductDetails }