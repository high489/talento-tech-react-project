import { Container } from 'react-bootstrap'

const Header = ({ children }) => {
  return (
    <header className='text-bg-dark'>
      <Container>
        {children}
      </Container>
    </header>
  )
}

export { Header }