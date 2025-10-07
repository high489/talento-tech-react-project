import styles from './gallery-interests.module.css'
import { Stack } from 'react-bootstrap'

import { ActionButton } from '@ui'

const GalleryInterests = ({ interests, toggleInterest }) => {
  return (
    <Stack
      direction='horizontal'
      gap={3}
      className={`py-2 px-2 flex-nowrap ${styles['gallery-interests']}`}
    >
      {interests.map((interest, index) => (
        <ActionButton
          key={index}
          onClick={() => toggleInterest(index)}
          customStyle={{ width: '150px', height: '50px' }}
          className={`
            ${styles['interest-button']}
            ${interest.isActive ? styles['interest-button-active'] : ''}
          `}
          variant={interest.isActive ? 'success' : 'primary'}
        >
          {interest.name}
        </ActionButton>
      ))}
    </Stack>
  )
}

export { GalleryInterests }