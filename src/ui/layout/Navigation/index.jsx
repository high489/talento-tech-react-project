import styles from './Navigation.module.css'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { NavLink, useLocation } from 'react-router-dom'

const Navigation = () => {
  const location = useLocation()
  const isDropdownActive = location.pathname.startsWith('/class')
  return (
    <Navbar className='py-3 d-flex justify-content-between' variant='dark'>
      <Navbar.Brand href='#'>eCommerce App</Navbar.Brand>

      <Nav>
        <Nav.Link as={NavLink} to='/'>Inicio</Nav.Link>
        <Nav.Link as={NavLink} to='/final'>Proyecto</Nav.Link>

        <NavDropdown
          title='Ejercicios'
          id='nav-dropdown'
          menuVariant='dark'
          className={isDropdownActive ? styles['dropdown-active'] : ''}
        >
          <NavDropdown.Item as={NavLink} to='/class01'>Clase01</NavDropdown.Item>
          <NavDropdown.Item as={NavLink} to='/class02'>Clase02</NavDropdown.Item>
          <NavDropdown.Item as={NavLink} to='/class03'>Clase03</NavDropdown.Item>
          <NavDropdown.Item as={NavLink} to='/class04'>Clase04</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar>
  )
}

export { Navigation }