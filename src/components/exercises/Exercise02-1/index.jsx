import { OrderedList } from '@ui'

const Exercise02_1 = () => {
  const products = ['Manzanas', 'Peras', 'Naranjas']

  return (
    <div className='w-30 mb-4'>
      <OrderedList
        listTitle='Lista de productos'
        listData={products}
      />
    </div>
  )
}

export { Exercise02_1 }