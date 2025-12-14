import styles from './product-details.module.css'
import { useState } from 'react'
import { Alert, Carousel, Col, Row, Spinner, Table } from 'react-bootstrap'

import { ActionButton } from '@ui'

const ProductDetails = ({ product, productLoading, productError, onAddToCard, cartQuantity }) => {
  const isOutOfStock = product ? cartQuantity >= product.stock : false

  const [ imgIndex, setImgIndex ] = useState(0)

  const handleSelect = (selectedIndex) => {
    setImgIndex(selectedIndex)
  }

  return (
    <div className={`w-100 d-flex flex-column ${styles['product-details']}`}>
      {productLoading && (
        <div className='d-flex justify-content-center align-items-center my-5'>
          <Spinner animation='border' variant='primary' />
        </div>
      )}

      {productError && (
        <Alert variant='danger' className='text-center my-4'>
          Error al cargar el producto: {productError}
        </Alert>
      )}

      {!productLoading && !productError && product && (
        <>
          <Row className='mb-4'>
            <Col md={7}>
              <Carousel
                className={`${styles['carousel']}`}
                variant='dark'
                activeIndex={imgIndex}
                onSelect={handleSelect}
                controls={product.images && product.images.length > 1}
                indicators={product.images && product.images.length > 1}
                interval={null}
                wrap={true}
              >
                {product.images && product.images.length > 0 ? (
                  product.images.map((img, i) => (
                    <Carousel.Item key={i}>
                      <img
                        src={img}
                        alt={`${product.title}-${i}`}
                        className='d-block w-100 rounded'
                        style={{ objectFit: 'contain', height: '300px' }}
                      />
                    </Carousel.Item>
                  ))
                ) : (
                  <Carousel.Item>
                    <img
                      src={product.thumbnail || 'https://via.placeholder.com/400x300?text=No+Image'}
                      alt={product.title}
                      className='d-block w-100 rounded'
                      style={{ objectFit: 'contain', height: '300px' }}
                    />
                  </Carousel.Item>
                )}
              </Carousel>
            </Col>

            <Col md={5} className='mt-4 mt-md-0 d-flex flex-column'>
              <h3 className={`mb-1 ${styles['product-title']}`}>{product.title}</h3>
              <p className={`mb-3 ${styles['product-brand']}`}>{product.brand || 'Sin marca'}</p>
              <p className={`mb-3 ${styles['product-description']}`}>{product.description}</p>
              <h4 className={`mb-1 ${styles['product-price']}`}>
                <span>${product.price?.toFixed(2) || '0.00'}</span>
              </h4>
              <p className={`mb-3 ${styles['product-text']}`}>
                Disponible:{' '}
                {(product.stock - cartQuantity) > 0 ? (
                  <span className='text-success'>{product.stock - cartQuantity}</span>
                ) : (
                  <span className='text-danger'>0</span>
                )}
              </p>
              <ActionButton
                variant='primary'
                className='w-100 mt-auto align-self-end'
                onClick={() => onAddToCard(product.id)}
                disabled={isOutOfStock}
              >
                Agregar al carrito
              </ActionButton>
            </Col>
          </Row>
          
          <Row className='my-4'>
            <Col md={12}>
              <h4 className={`mb-1 ${styles['product-title']}`}>Detalles del producto</h4>
              <Table
                className={`mb-3 ${styles['product-details-table']}`}
                striped
                bordered 
                hover
              >
                <tbody>
                  {product.weight > 0 && (
                    <tr>
                      <td>Peso</td>
                      <td>{product.weight} g</td>
                    </tr>
                  )}
                  {product.dimensions && (
                    <tr>
                      <td>Dimensiones</td>
                      <td>
                        {product.dimensions.width || 0} × {product.dimensions.height || 0} × {product.dimensions.depth || 0} cm
                      </td>
                    </tr>
                  )}
                  {product.minimumOrderQuantity && (
                    <tr>
                      <td>Cantidad mínima de pedido</td>
                      <td>{product.minimumOrderQuantity}</td>
                    </tr>
                  )}
                  {product.warrantyInformation && (
                    <tr>
                      <td>Garantía</td>
                      <td>{product.warrantyInformation}</td>
                    </tr>
                  )}
                  {product.shippingInformation && (
                    <tr>
                      <td>Envío</td>
                      <td>{product.shippingInformation}</td>
                    </tr>
                  )}
                  {product.returnPolicy && (
                    <tr>
                      <td>Política de devoluciones</td>
                      <td>{product.returnPolicy}</td>
                    </tr>
                  )}
                  {product.sku && (
                    <tr>
                      <td>SKU</td>
                      <td>{product.sku}</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Col>
          </Row>
        </>
      )}
      
    </div>
  )
}

export { ProductDetails }