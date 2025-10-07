import 'normalize.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { RouterProvider } from 'react-router-dom'

import { router } from '@app/router'

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
