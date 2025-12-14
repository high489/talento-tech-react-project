import { CartManager } from '@components'

const CartView = () => {
  return (
    <section className='d-flex flex-column align-items-center flex-grow-1'>
      <CartManager />
    </section>   
  )
}

export { CartView }