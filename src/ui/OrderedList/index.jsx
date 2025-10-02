import { ListGroup } from 'react-bootstrap'
import styles from './ordered-list.module.css'

const OrderedList = ({ listTitle, listData }) => {
  return (
    <div className={`mb-3 px-3 py-3 ${styles['ordered-list']}`}>
      <h3 className='mb-2 fs-4'>{listTitle}</h3>
      <ListGroup as='ol' 
        numbered
        className='fs-5 ps-3'
      >
        {listData.map((listItem, index) => (
          <ListGroup.Item as='li'
            key={index}
            className={`mb-2 ${styles['list-item']}`}
          >
            {listItem}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export { OrderedList }