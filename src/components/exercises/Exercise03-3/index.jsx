import { useState } from 'react'

import { GalleryInterests } from '@ui'

const Exercise03_3 = () => {
  const rawInterests = ['React', 'JavaScript', 'APIs', 'Diseño UX', 'Node.js']

  const [interests, setInterests] = useState(
    rawInterests.map(name => ({ name, isActive: false }))
  )

  const handleToggleInterest = (interestIndex) => {
    setInterests(prev =>
      prev.map((interest, index) =>
        index === interestIndex ? { ...interest, isActive: !interest.isActive } : interest
      )
    )
  }

  return (
    <GalleryInterests
      interests={interests}
      toggleInterest={handleToggleInterest}
    />
  )
}

export { Exercise03_3 }