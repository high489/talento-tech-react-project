import styles from './main.module.css'
import { Container } from 'react-bootstrap'

const Main = ({ children }) => {
  return (
    <Container as='main' className={styles['main']}>
      {children}
    </Container>
  )
}

export { Main }