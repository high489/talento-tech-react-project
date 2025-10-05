import 'normalize.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { RouterProvider } from 'react-router-dom'

import { router } from '@app/router'
import { Class01, Class02, Class03, Class04 } from '@views'

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
