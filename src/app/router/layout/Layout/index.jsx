import styles from './layout.module.css'
import { Outlet } from 'react-router-dom'

import { Header, Main, Footer, Navigation } from '@app/router/layout'

const Layout = () => {
  return (
    <div className='d-flex flex-column min-vh-100'>
      <Header>
        <Navigation/>
      </Header>
      <Main>
        <Outlet />
      </Main>
      <Footer>
        <div className={`py-3 d-flex flex-column align-items-end ${styles['footer']}`}>
          <span className='fw-semibold'>Vitalii Matskaniuk</span>
          <span>Talento Tech — 25235 | React JS</span>
        </div>
      </Footer>
    </div>
  )
}

export { Layout }
