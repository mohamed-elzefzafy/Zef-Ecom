import { lazy, Suspense } from 'react'
import MainLayout from '@layouts/mainLayout/MainLayout'
const AboutUsPage = lazy(() => import('@pages/AboutUsPage'));
import ErrorPage from '@pages/ErrorPage'
const HomePage = lazy(() => import("@pages/HomePage"));
const WishlistPage = lazy(() => import('@pages/WishlistPage'));
const CartPage = lazy(() => import('@pages/CartPage'));
const ProductsPage = lazy(() => import('@pages/ProductsPage'));
const CategoriesPage = lazy(() => import('@pages/CategoriesPage'));
const LoginPage = lazy(() => import('@pages/LoginPage'));
const RegisterPage = lazy(() => import('@pages/RegisterPage'));



import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const AppRouer = () => {
  const router = createBrowserRouter([
    {path : "/" ,
       element : <MainLayout/>,
       errorElement : <ErrorPage/>,
      children :[
        {index : true , element : <Suspense fallback="Loading... please wait"><HomePage/></Suspense>},
        {path : "cart" , element :   <Suspense fallback="Loading... please wait"><CartPage/></Suspense>},
        {path : "Wishlist" , element : <Suspense fallback="Loading... please wait"><WishlistPage/></Suspense>},
        {path : "categories" , element : <Suspense fallback="Loading... please wait"><CategoriesPage/></Suspense>},
        {path : "categories/products/:prefix" , element :   <Suspense fallback="Loading... please wait"><ProductsPage/></Suspense> ,

          loader : ({params}) => {
            if ( typeof params.prefix !== "string" || !/^[a-z]+$/i.test(params.prefix)) {
              throw new Response("Bad request" , {
                statusText : "Bad request",
                status : 400,
              })
            }
            

return true;
          }
        },
        {path : "about-us" , element :  <Suspense fallback="Loading... please wait"><AboutUsPage/></Suspense>},
        {path : "register" , element : <Suspense fallback="Loading... please wait"><RegisterPage/> </Suspense>},
        {path : "login" , element : <Suspense fallback="Loading... please wait"><LoginPage/> </Suspense>},

    ]},
  ])
  return (
<RouterProvider router={router}/>
  )
}

export default AppRouer