import React from 'react'
import{ createBrowserRouter , RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import SignupTypeSelector from './pages/SignupTypeSelector'
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
import ReturnsAndOrders from './pages/ReturnsAndOrders'

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
    element: <SignupTypeSelector />
  },
  {
    path: "/signup/user",
    element: <Signup />
  },
  {
    path: "/signup/seller",
    element: (
      <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-2xl font-bold text-slate-900 mb-4">Seller Signup</h1>
            <p className="text-slate-600 mb-6">Coming Soon! We're working on the seller registration process.</p>
            <button
              onClick={() => window.history.back()}
              className="bg-slate-600 text-white px-6 py-2 rounded-lg hover:bg-slate-700 transition"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    )
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
  },
  {
    path: '/orders-and-returns',
    element: <><Navbar/><Sidebar/><ReturnsAndOrders/><Footer/></>
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