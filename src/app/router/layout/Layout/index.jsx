import styles from './layout.module.css'
import { Outlet } from 'react-router-dom'

import { useUserCartSync } from '@app/hooks'
import { Header, Main, Footer, Navigation } from '@app/router/layout'

const Layout = () => {
  useUserCartSync()
  
  return (
    <div className='d-flex flex-column'>
      <div className='d-flex flex-column min-vh-100'>
        <Header>
          <Navigation/>
        </Header>
        <Main>
          <Outlet />
        </Main>
      </div>
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
