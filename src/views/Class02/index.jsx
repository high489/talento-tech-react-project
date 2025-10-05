import { Exercise02_1, Exercise02_2 } from '@components'

const Class02 = () => {
  return (
    <section className='d-flex flex-column align-items-center mb-3'>
      <h2 className='my-3'>Ejercicios de Clase 2</h2>
      <div className='d-flex justify-content-evenly gap-2 w-100'>
        <Exercise02_1 />
        <Exercise02_2 />
      </div>
    </section>
  )
}

export { Class02 }