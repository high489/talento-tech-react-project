import { Exercise03_1, Exercise03_2, Exercise03_3 } from '@components'

const Class03 = () => {
  return (
    <section className='d-flex flex-column align-items-center mb-3'>
      <h2 className='my-3'>Ejercicios de Clase 3</h2>
      <div className='d-flex flex-column gap-5 w-100'>
        <div className='d-flex flex-column'>
          <h4 className='text-center text-lg-start'>Equipo Talento Lab</h4>
          <Exercise03_1 />
        </div>
        <div className='d-flex flex-column'>
          <h4 className='text-center text-lg-start'>El componente TarjetaProyecto</h4>
          <Exercise03_2 />
        </div>
        <div className='d-flex flex-column mb-4'>
          <h4 className='text-center text-lg-start'>El componente GaleriaIntereses</h4>
          <Exercise03_3 />
        </div>
      </div>
    </section>
  )
}

export { Class03 }