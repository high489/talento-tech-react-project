import { CustomCard } from '@ui'

const Exercise02_2 = () => {
  const cardData = {
    title: 'Oferta especial',
    description: '20% de descuento en todos los productos',
    buttonText: 'Ver más',
  }

  return (
    <div className='mb-4'>
      <CustomCard
        title={cardData.title}
        description={cardData.description}
        buttonText={cardData.buttonText}
      />
    </div>
  )
}

export { Exercise02_2 }