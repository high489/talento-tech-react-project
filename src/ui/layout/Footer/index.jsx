import styles from './footer.module.css'
import { Container } from 'react-bootstrap'

const Footer = ({ children }) => {
  return (
    <Container as='footer' className={styles['footer']}>
      {children}
    </Container>
  )
}

export { Footer }