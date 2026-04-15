import React from 'react'
import{ createBrowserRouter , RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Verify from './pages/Verify'
import VerifyEmail from './pages/verifyEmail'
import Footer from './components/footer'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Profile from './pages/profile'
import ProductPage from './pages/productPage'
import SingleProduct from './pages/SingleProduct'
import Cart from './pages/Cart'

const router = createBrowserRouter([
  {
    path: "/",
    element: <><Navbar/><Sidebar/><Home/><Footer/></>
  },
  {
    path: "/products",
    element: <><Navbar/><Sidebar/><ProductPage/><Footer/></>
  },
  {
    path: "/signin",
    element: <Signin />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/verify",
    element: <Verify />
  },
  {
    path:"/verify/:token",
    element:<VerifyEmail/>
  },
  {
    path:'/profile',
    element:<><Navbar/><Sidebar/><Profile/></>
  },
  {
    path: '/cart',
    element: <><Navbar/><Sidebar/><Cart/></>
  },
  {
    path: '/product/:id',
    element: <><Navbar/><Sidebar/><SingleProduct/><Footer/></>
  }
])

const App = () => {
  return (
    <>  
      <RouterProvider router={router}/>
    </>
  )
}

export default App