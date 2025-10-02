import styles from './header.module.css'
import { Container } from 'react-bootstrap'

const Header = ({ children }) => {
  return (
    <Container as='header' className={styles['header']}>
      {children}
    </Container>
  )
}

export { Header }