import 'normalize.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { RouterProvider } from 'react-router-dom'

import { router } from '@app/router'
import { UsersProvider, ProductsProvider } from '@app/store/context'

function App() {
  return (
    <UsersProvider>
      <ProductsProvider>
        <RouterProvider router={router} />
      </ProductsProvider>
    </UsersProvider>
    
  )
}

export default App