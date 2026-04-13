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
import Profile from './pages/profile'
import ProductPage from './pages/productPage'
import Cart from './pages/Cart'

const router = createBrowserRouter([
  {
    path: "/",
    element: <><Navbar/><Home/><Footer/></>
  },
  {
    path: "/products",
    element: <><Navbar/><ProductPage/><Footer/></>
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
    element:<><Navbar/><Profile/></>
  },
  {
    path: '/cart',
    element: <><Navbar/><Cart/></>
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