import styles from './custom-card.module.css'
import { Card } from 'react-bootstrap'

import { ActionButton } from '@ui'

const CustomCard = ({ title, description, buttonText, cardWidth = '400px', cardHeight, onClick }) => {
  return (
    <Card 
      style={{ 
        width: cardWidth,
        height: cardHeight ? cardHeight : 'auto' }} 
      className={`p-3 text-bg-light ${styles['custom-card']}`}
    >
      <Card.Body className='d-flex flex-column'>
        <Card.Title className={`mb-2 ${styles['title']}`}>{title}</Card.Title>
        <Card.Text className={`mb-3 ${styles['description']}`}>{description}</Card.Text>
        <ActionButton
          onClick={onClick}
          className='mt-auto'
        >
          {buttonText}
        </ActionButton>
      </Card.Body>
    </Card>
  )
}

export { CustomCard }