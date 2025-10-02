import styles from './class04.module.css'

import { Footer, Header, Main, Navigation } from '@ui'
import { Exercise04_1 } from '@components'

const Class04 = () => {
  return (
    <div className={`d-flex flex-column min-vh-100 ${styles['class04']}`}>
      <Header>
        <h2 style={{ textAlign: 'center' }}>Ejercicios de Clase 4</h2>
      </Header>
      <Navigation
        brandTitle='eCommerce App'
        navLinks={['Inicio', 'Productos', 'Carrito']}
      />
      <Main>
        <Exercise04_1 />
      </Main>
      <Footer>
        <p>25235 | React JS</p>
      </Footer>
    </div>
  )
}

export { Class04 }