import styles from './talent-lab-member-card.module.css'

import { Card } from 'react-bootstrap'

const TalentLabMemberCard = ({ member, cardWidth = '300px', cardHeight = '150px' }) => {
  return (
    <Card
      className={`text-bg-light ${styles['member-card']}`}
      style={{ width: cardWidth, height: cardHeight }}
    >
      <Card.Body className='py-2 px-2 d-flex align-items-center gap-3'>
        <img
          src={member.image}
          alt={member.name}
          className='rounded-circle img-fluid object-fit-cover'
          style={{ maxWidth: '40%' }}
        />
        <div className='d-flex flex-column justify-content-center'>
          <Card.Title className='mb-1 fs-5'>{member.name}</Card.Title>
          <Card.Text className='text-break small mb-0'>{member.role}</Card.Text>
        </div>
      </Card.Body>
    </Card>
  )
}

export { TalentLabMemberCard }