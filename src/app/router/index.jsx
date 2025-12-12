import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

import { Layout } from './layout/Layout'
import {
  HomeView,
  CarritoView,
  ProductsView,
  ProductDetailsView,
  NotFoundView,

  // Class01,
  // Class02,
  // Class03,
} from '@views'

const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path='/' element={<Layout />}>
      <Route index element={<HomeView />} />
      <Route path='carrito' element={<CarritoView />} />
      <Route path='products' element={<ProductsView />} />
      <Route path='products/:id' element={<ProductDetailsView />} />
      <Route path='*' element={<NotFoundView />} />

      {/* <Route path='class01' element={<Class01 />} />
      <Route path='class02' element={<Class02 />} />
      <Route path='class03' element={<Class03 />} /> */}
    </Route>
  </>
), { basename: '/talento-tech-react-project' })

export { router }