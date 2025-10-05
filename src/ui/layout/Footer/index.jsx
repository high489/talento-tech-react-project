import { Container } from 'react-bootstrap'

const Footer = ({ children }) => {
  return (
    <footer className='text-bg-dark'>
      <Container>
        {children}
      </Container>
    </footer>
  )
}

export { Footer }