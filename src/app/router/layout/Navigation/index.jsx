import styles from './navigation.module.css'
import { useState } from 'react'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link, NavLink, useLocation } from 'react-router-dom'

import OwlLogo from '@app/assets/icons/owl.svg?react'

const Navigation = () => {
  const [expanded, setExpanded] = useState(false)
  const location = useLocation()
  const isDropdownActive = location.pathname.startsWith('/class')

  return (
    <Navbar
      className='py-3'
      variant='dark'
      expand='md'
      expanded={expanded}
    >
      <Navbar.Brand as={Link} to='/' className='mx-2 d-flex align-items-center gap-2'>
        <OwlLogo style={{ width: '35px', height: 'auto' }}/>
        <Navbar.Text className={`p-0 ${styles['brand-title']}`}>Lechuza</Navbar.Text>
      </Navbar.Brand>

      <Navbar.Toggle
        aria-controls='basic-navbar-nav'
        onClick={() => setExpanded(!expanded)}
      />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className={`ms-auto text-end ${styles['nav-link-text']}`}>
          <Nav.Link 
            className='mt-2 mt-md-0'
            as={NavLink}
            to='/'
            onClick={() => setExpanded(false)}
          >
            Inicio
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            to='/products'
            onClick={() => setExpanded(false)}
          >
            Productos
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            to='/carrito'
            onClick={() => setExpanded(false)}
          >
            Carrito
          </Nav.Link>

          {/* <NavDropdown
            title='Ejercicios'
            id='nav-dropdown'
            menuVariant='dark'
            align='end'
            drop='down'
            className={isDropdownActive ? styles['dropdown-active'] : ''}
            renderMenuOnMount
          >
            <NavDropdown.Item as={NavLink} to='/class01' onClick={() => setExpanded(false)}>
              Clase01
            </NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to='/class02' onClick={() => setExpanded(false)}>
              Clase02
            </NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to='/class03' onClick={() => setExpanded(false)}>
              Clase03
            </NavDropdown.Item>
          </NavDropdown> */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export { Navigation }