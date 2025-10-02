import styles from './navigation.module.css'
import { Container, Nav, Navbar } from 'react-bootstrap'

const Navigation = ({ brandTitle, navLinks }) => {
  return (
    <Navbar className={`mb-4 ${styles['navbar-custom']}`}>
      <Container className="d-flex justify-content-between">
        <Navbar.Brand href='#'>{brandTitle}</Navbar.Brand>
        <Nav>
          {navLinks.map((navLink, index) => (
            <Nav.Link
              key={index}
              href='#'
            >
              {navLink}
            </Nav.Link>
          ))}
        </Nav>
      </Container>
    </Navbar>
  )
}

export { Navigation }