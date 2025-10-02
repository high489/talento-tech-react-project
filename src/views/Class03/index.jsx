import { Container } from 'react-bootstrap'

import { Exercise03_1, Exercise03_2, Exercise03_3 } from '@components'

const Class03 = () => {
  return (
    <Container as='section'
      className='d-flex flex-column align-items-center mb-3'
    >
      <h2 className='mb-4'>Ejercicios de Clase 3</h2>
      <div className='d-flex flex-column gap-2 w-100'>
        <Exercise03_1 />
        <Exercise03_2 />
        <Exercise03_3 />
      </div>
    </Container>
  )
}

export { Class03 }