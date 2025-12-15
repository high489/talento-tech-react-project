import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

import { RequiredAuth } from '@app/hoc'
import { Layout } from './layout/Layout'
import {
  LoginView,
  CartView,
  ProductsView,
  ProductCreateView,
  ProductUpdateView,
  ProductDetailsView,
  NotFoundView,

  // Class01,
  // Class02,
  // Class03,
} from '@views'

const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path='login' element={<LoginView />} />
    <Route
        path='/'
        element={
          <RequiredAuth>
            <Layout />
          </RequiredAuth>
        }
      >
        <Route index element={<ProductsView />} />
        <Route path='products' element={<ProductsView />} />
        <Route path='products/create' element={<ProductCreateView />} />
        <Route path='products/:id' element={<ProductDetailsView />} />
        <Route path='products/:id/update' element={<ProductUpdateView />} />
        <Route path='carrito' element={<CartView />} />
        <Route path='*' element={<NotFoundView />} />
      </Route>
    {/* <Route path='/' element={<Layout />}>
      <Route index element={<ProductsView />} />
      <Route path='login' element={<LoginView />} />
      <Route path='carrito' element={<CartView />} />
      <Route path='products' element={<ProductsView />} />
      <Route path='products/create' element={<ProductCreateView />} />
      <Route path='products/:id' element={<ProductDetailsView />} />
      <Route path='products/:id/update' element={<ProductUpdateView />} />
      <Route path='*' element={<NotFoundView />} />

      <Route path='class01' element={<Class01 />} />
      <Route path='class02' element={<Class02 />} />
      <Route path='class03' element={<Class03 />} />
    </Route> */}
  </>
), { basename: '/talento-tech-react-project' })

export { router }