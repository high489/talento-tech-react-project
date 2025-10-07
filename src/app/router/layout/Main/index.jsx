import { Container } from 'react-bootstrap'

const Main = ({ children }) => {
  return (
    <Container as='main' className='d-flex flex-column flex-grow-1 flex-shrink-0'>
      {children}
    </Container>
  )
}

export { Main }