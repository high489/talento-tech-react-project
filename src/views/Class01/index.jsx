import { Container } from 'react-bootstrap'

import { Exercise01_1 } from '@components'

const Class01 = () => {
  return (
    <Container as='section'
      className='d-flex flex-column align-items-center mb-3'
    >
      <h2 className='mb-4'>Ejercicios de Clase 1</h2>
      <Exercise01_1 />
    </Container>
  )
}

export { Class01 }