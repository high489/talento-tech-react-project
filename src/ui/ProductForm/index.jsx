import styles from './product-form.module.css'
import { Alert, Button, Col, Form, Row, Spinner } from 'react-bootstrap'

const ProductForm = ({ 
  formData, 
  onChange, 
  onSubmit, 
  onCancel, 
  loading, 
  error,
  isEditMode = false,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target
    onChange(name, value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted!', formData)
    onSubmit()
  }

  const handleCancelClick = () => {
    console.log('Cancel clicked!')
    onCancel()
  }

  return (
    <Form onSubmit={handleSubmit} className={`w-100 ${styles['product-form']}`}>
      {error && (
        <Alert variant='danger' className='mb-3'>
          {error}
        </Alert>
      )}

      <Row className='mb-3'>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Título *</Form.Label>
            <Form.Control
              type='text'
              name='title'
              value={formData.title}
              onChange={handleChange}
              required
              placeholder='Nombre del producto'
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group>
            <Form.Label>Marca</Form.Label>
            <Form.Control
              type='text'
              name='brand'
              value={formData.brand}
              onChange={handleChange}
              placeholder='Marca del producto'
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className='mb-3'>
        <Col md={12}>
          <Form.Group>
            <Form.Label>Descripción *</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              name='description'
              value={formData.description}
              onChange={handleChange}
              required
              placeholder='Descripción del producto'
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className='mb-3'>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Precio *</Form.Label>
            <Form.Control
              type='number'
              step='0.01'
              min='0'
              name='price'
              value={formData.price}
              onChange={handleChange}
              required
              placeholder='0.00'
            />
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group>
            <Form.Label>Stock *</Form.Label>
            <Form.Control
              type='number'
              min='0'
              name='stock'
              value={formData.stock}
              onChange={handleChange}
              required
              placeholder='0'
            />
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group>
            <Form.Label>Categoría *</Form.Label>
            <Form.Control
              type='text'
              name='category'
              value={formData.category}
              onChange={handleChange}
              required
              placeholder='Categoría'
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className='mb-3'>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Peso (g)</Form.Label>
            <Form.Control
              type='number'
              min='0'
              name='weight'
              value={formData.weight}
              onChange={handleChange}
              placeholder='0'
            />
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group>
            <Form.Label>Ancho (cm)</Form.Label>
            <Form.Control
              type='number'
              step='0.01'
              min='0'
              name='width'
              value={formData.width}
              onChange={handleChange}
              placeholder='0'
            />
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group>
            <Form.Label>Alto (cm)</Form.Label>
            <Form.Control
              type='number'
              step='0.01'
              min='0'
              name='height'
              value={formData.height}
              onChange={handleChange}
              placeholder='0'
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className='mb-3'>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Profundidad (cm)</Form.Label>
            <Form.Control
              type='number'
              step='0.01'
              min='0'
              name='depth'
              value={formData.depth}
              onChange={handleChange}
              placeholder='0'
            />
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group>
            <Form.Label>Cantidad mínima</Form.Label>
            <Form.Control
              type='number'
              min='1'
              name='minimumOrderQuantity'
              value={formData.minimumOrderQuantity}
              onChange={handleChange}
              placeholder='1'
            />
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group>
            <Form.Label>SKU</Form.Label>
            <Form.Control
              type='text'
              name='sku'
              value={formData.sku}
              onChange={handleChange}
              placeholder='SKU-XXX'
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className='mb-3'>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Garantía</Form.Label>
            <Form.Control
              type='text'
              name='warrantyInformation'
              value={formData.warrantyInformation}
              onChange={handleChange}
              placeholder='Información de garantía'
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group>
            <Form.Label>Información de envío</Form.Label>
            <Form.Control
              type='text'
              name='shippingInformation'
              value={formData.shippingInformation}
              onChange={handleChange}
              placeholder='Información de envío'
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className='mb-4'>
        <Col md={12}>
          <Form.Group>
            <Form.Label>Política de devoluciones</Form.Label>
            <Form.Control
              type='text'
              name='returnPolicy'
              value={formData.returnPolicy}
              onChange={handleChange}
              placeholder='Política de devoluciones'
            />
          </Form.Group>
        </Col>
      </Row>
      
      <div className='d-flex gap-3 justify-content-end'>
        <Button
          type='button'
          variant='secondary'
          onClick={handleCancelClick}
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button
          type='submit'
          variant='primary'
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner
                as='span'
                animation='border'
                size='sm'
                role='status'
                aria-hidden='true'
                className='me-2'
              />
              {isEditMode ? 'Actualizando...' : 'Creando...'}
            </>
          ) : (
            isEditMode ? 'Actualizar producto' : 'Crear producto'
          )}
        </Button>
      </div>
    </Form>
  )
}

export { ProductForm }