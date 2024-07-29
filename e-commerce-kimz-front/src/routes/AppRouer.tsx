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
import LottieHandler from '@components/feedBack/lottieHandler/LottieHandler';
import SuspenceLazyLoading from '@components/feedBack/suspenseLazyLoading/SuspenceLazyLoading';

const AppRouer = () => {
  const router = createBrowserRouter([
    {path : "/" ,
       element :<SuspenceLazyLoading> <MainLayout/></SuspenceLazyLoading>,
       errorElement : <ErrorPage/>,
      children :[
        {index : true , element :<SuspenceLazyLoading> <HomePage/> </SuspenceLazyLoading>},
        {path : "cart" , element :  <SuspenceLazyLoading> <CartPage/> </SuspenceLazyLoading>},
        {path : "Wishlist" , element : <SuspenceLazyLoading> <WishlistPage/> </SuspenceLazyLoading>},
        {path : "categories" , element :<SuspenceLazyLoading> <CategoriesPage/> </SuspenceLazyLoading>},
        {path : "categories/products/:prefix" , element :   <SuspenceLazyLoading> <ProductsPage/> </SuspenceLazyLoading> ,

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
        {path : "about-us" , element :  <SuspenceLazyLoading> <AboutUsPage/> </SuspenceLazyLoading>},
        {path : "register" , element :  <SuspenceLazyLoading> <RegisterPage/> </SuspenceLazyLoading>},
        {path : "login" , element :  <SuspenceLazyLoading> <LoginPage/> </SuspenceLazyLoading>},

    ]},
  ])
  return (
<RouterProvider router={router}/>
  )
}

export default AppRouer