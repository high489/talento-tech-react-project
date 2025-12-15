import styles from './action-button.module.css'
import { Button } from 'react-bootstrap'

const ActionButton = ({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  type = 'button',
  className = '',
  customStyle = {},
}) => {

  return (
    <Button
      type={type}  
      variant={variant}
      className={`${styles['action-button']} ${className}`}
      onClick={onClick}
      disabled={disabled}
      style={customStyle}
    >
      {children}
    </Button>
  )
}

export { ActionButton }