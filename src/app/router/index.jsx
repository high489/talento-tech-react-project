import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

import { Layout } from './layout/Layout'
import {
  Home,
  Class01,
  Class02,
  Class03,
  ECommerceApp,
  ProductDetailsView,
  NotFound,
} from '@views'

const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path='/' element={<Layout />}>
      <Route index element={<Home />} />
      <Route path='class01' element={<Class01 />} />
      <Route path='class02' element={<Class02 />} />
      <Route path='class03' element={<Class03 />} />
      <Route path='e-commerce-app' element={<ECommerceApp />} />
      <Route path='e-commerce-app/:id' element={<ProductDetailsView />} />
      <Route path='*' element={<NotFound />} />
    </Route>
  </>
), { basename: '/talento-tech-react-project' })

export { router }