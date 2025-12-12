import 'normalize.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { RouterProvider } from 'react-router-dom'

import { router } from '@app/router'
import { ProductsProvider } from '@app/store/context'

function App() {
  return (
    <ProductsProvider>
      <RouterProvider router={router} />
    </ProductsProvider>
  )
}

export default App