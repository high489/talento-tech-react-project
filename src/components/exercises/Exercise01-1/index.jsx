import { useState } from 'react'
import { Stack } from 'react-bootstrap'

import { ActionButton } from '@ui'

const Exercise01_1 = () => {
  const [count, setCount] = useState(0)
  const name = 'John Doe'
  const customBtnStyle = {
    width: '200px',
    height: '50px',
    padding: '10px 20px',
  }

  const handleGreeting = () => {
    alert(`Bienvenido, ${name}! Como estás!`)
  }
  
  return (
    <Stack
      direction='horizontal'
      gap={4}
      className='justify-content-evenly w-100'
    >
      <Stack gap={2} className='align-items-center'>
        <h3>Botón Contador</h3>
        <ActionButton
          variant='primary'
          onClick={() => setCount((count) => count + 1)}
          customStyle={customBtnStyle}
        >
          cuenta es {count}
        </ActionButton>
      </Stack>

      <Stack gap={2} className='align-items-center'>
        <h3>Botón de Saludo</h3>
        <ActionButton
          variant='primary'
          onClick={handleGreeting}
          customStyle={{ width: '400px', height: '50px', padding: '10px 20px' }}
        >
          Hola {name}
        </ActionButton>
      </Stack>
    </Stack>
  )
}

export { Exercise01_1 }