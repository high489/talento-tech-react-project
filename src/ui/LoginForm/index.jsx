import styles from './login-form.module.css'
import { Alert, Card, Form, Spinner } from 'react-bootstrap'

import { ActionButton } from '@ui'

const LoginForm = ({
  authLoading,
  authError,
  username,
  setUsername,
  password,
  setPassword,
  onSubmit
}) => {
  return (
    <Card style={{ maxWidth: '420px' }} className='w-100 shadow-sm'>
      <Card.Body>
        <Card.Title className={`mb-4 text-center ${styles['login-form-title']}`}>
          Iniciar sesión
        </Card.Title>

        {authError && (
          <Alert variant='danger'>
            {authError}
          </Alert>
        )}

        <Form onSubmit={onSubmit}>
          <Form.Group className='mb-3'>
            <Form.Label className={styles['form-group-label']}>Usuario</Form.Label>
            <Form.Control
              className={styles['form-group-control']}
              type='text'
              placeholder='Ingrese su usuario'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className='mb-4'>
            <Form.Label className={styles['form-group-label']}>Contraseña</Form.Label>
            <Form.Control
              className={styles['form-group-control']}
              type='password'
              placeholder='Ingrese su contraseña'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <ActionButton
            type='submit'
            variant='primary'
            className='w-100'
            disabled={authLoading}
          >
            {authLoading ? (
              <>
                <Spinner size='sm' className='me-2' />
                Ingresando...
              </>
            ) : (
              'Ingresar'
            )}
          </ActionButton>
        </Form>

        <div className='text-muted mt-3 small'>
          <div>Usuarios demo:</div>
          <div><b>emilys</b> / emilyspass</div>
          <div><b>michaelw</b> / michaelwpass</div>
          <div><b>sophiab</b> / sophiabpass</div>
        </div>
      </Card.Body>
    </Card>
  )
}

export { LoginForm }