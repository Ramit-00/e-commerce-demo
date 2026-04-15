import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import {ShoppingCart} from 'lucide-react'
import { useSelector,useDispatch } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import { setUser } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'


const Navbar = () => {
  const {user} = useSelector(store=>store.user)  // Accessing the user state from the Redux store using useSelector hook
  const { totalItems } = useSelector(store => store.cart)  // Accessing cart state
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async ()=>{
    try{
      const res = await axios.post(`http://localhost:8000/api/v1/user/logout`, {}, {
        headers:{
          Authorization: `Bearer ${accessToken}` 
        }
      })
      if(res.data.success){
        dispatch(setUser(null))  // Clear the user state in the Redux store by setting it to null
        // localStorage.removeItem("accessToken");  // Remove the access token from local storage
        toast.success(res.data.message);
      }
    } catch(error){
      console.log(error);
    }
  }
  return(
    <header className="bg-slate-100 text-slate-900 fixed w-full z-20 border-b border-slate-300 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition">
          <img src="/e-kart.png" alt="eKart logo" className="h-10 w-auto rounded-lg" />
          <div>
            <h1 className="text-xl font-bold tracking-tight">eKart</h1>
            <p className="text-sm text-slate-600">Smart shopping made easy</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-5 text-sm font-medium">
          <ul className="flex items-center gap-5">
            <Link to="/" className="hover:text-black hover:bg-slate-200 px-3 py-2 rounded transition">Home</Link>

            <Link to="/products" className="hover:text-black hover:bg-slate-200 px-3 py-2 rounded transition">Products</Link>
            <Link to="/orders-and-returns" className="hover:text-black hover:bg-slate-200 px-3 py-2 rounded transition">Orders & Returns</Link>
            {
              user && (
                <Link to="/profile" className="hover:text-black hover:bg-slate-200 px-3 py-2 rounded transition">
                  Hello, {user.firstName}
                </Link>
              )
            }
          </ul>
          <Link to="/cart" className="relative hover:text-black hover:bg-slate-200 px-3 py-2 rounded transition">
            <ShoppingCart/>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1 min-w-[18px] h-[18px] flex items-center justify-center">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </Link>
          <Link >
          {
            user ? (
              <Button
                onClick={logoutHandler}
                className="bg-red-500 text-white hover:bg-red-600 px-3 py-2 rounded transition"
              >
                Logout
              </Button>
            ) : (
              <Button
                onClick={() => navigate('/login')}
                className="bg-black text-white hover:bg-gray-600 px-3 py-2 rounded transition"
              >
                Login
              </Button>
            )
          }
          </Link>
        </nav>

        {/* <div className="md:hidden">
          <button className="text-slate-700 hover:text-black focus:outline-none focus:ring-2 focus:ring-slate-400 rounded">Menu</button> */}
        {/* </div> */}
      </div>
    </header>
  )
}

export default Navbar