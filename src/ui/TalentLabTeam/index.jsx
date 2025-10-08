import styles from './talent-lab-team.module.css'
import { Row, Col } from 'react-bootstrap'

import { TalentLabMemberCard } from '@ui'

const TalentLabTeam = ({ team, cardWidth = '300px', cardHeight = '150px', style }) => {
  return (
    <div
      className={`py-2 px-3 ${styles['talent-lab-team']}`}
      style={style}
    >
      <Row xs={1} sm={2} xl={4}>
        {team.map((member, index) => (
          <Col
            key={index}
            className='d-flex justify-content-center my-2'
          >
            <TalentLabMemberCard
              member={member}
              cardWidth={cardWidth}
              cardHeight={cardHeight}
            />
          </Col>
        ))}
      </Row>
    </div>
    
  )
}

export { TalentLabTeam }