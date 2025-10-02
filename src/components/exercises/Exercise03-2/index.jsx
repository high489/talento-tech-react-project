import { Stack } from 'react-bootstrap'

import { CustomCard } from '@ui'

const Exercise03_2 = () => {
  const projects = [
    {
      title: 'Plataforma de Gestión',
      description: 'Una herramienta para optimizar la gestión de equipos.',
      buttonText: 'Explorar proyecto',
    },
    {
      title: 'Tienda en Línea',
      description: 'Aplicación web para la venta de productos con integración de pagos.',
      buttonText: 'Ver más',
    },
    {
      title: 'Sistema de Reservas',
      description: 'Aplicación para reservar habitaciones de hotel y gestionar pedidos.',
      buttonText: 'Reservar ahora',
    },
    {
      title: 'Panel Analítico',
      description: 'Un panel de control para visualizar indicadores clave del negocio.',
      buttonText: 'Ver dashboard',
    },
    {
      title: 'Red Social',
      description: 'Plataforma para comunicarte y compartir contenido con amigos y colegas.',
      buttonText: 'Unirse',
    },
  ]

  return (
    <Stack
      direction='horizontal'
      gap={4}
      className='py-2 px-2 justify-content-evenly flex-wrap'
    >
      {projects.map((project, index) => (
        <CustomCard
          key={index}
          title={project.title}
          description={project.description}
          buttonText={project.buttonText}
          cardWidth='400px'
          cardHeight='200px'
          onClick={() => console.log(`Explorando: ${project.title}`)}
        />
      ))}
    </Stack>
  )
}

export { Exercise03_2 }