import { Outlet } from 'react-router-dom'

import { Header, Main, Footer, Navigation } from '@ui'

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
        <div className='py-3 d-flex flex-column'>
          <small className='fw-semibold'>Vitalii Matskaniuk</small>
          <small>Talento Tech — 25235 | React JS</small>
        </div>
      </Footer>
    </div>
  )
}

export { Layout }
