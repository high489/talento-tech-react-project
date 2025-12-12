import { ProductsManager } from '@components'

const ProductsView = () => {
  return (
    <section className='d-flex flex-column align-items-center mb-3'>
      <ProductsManager pagination={true} />
    </section>
  )
}

export { ProductsView }