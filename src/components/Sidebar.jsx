import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, TrendingUp, Layers, HelpCircle, Home, Package, User, Settings, ShoppingBag, LogIn, LogOut } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { setUser } from '../redux/userSlice'
import './Sidebar.css'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useSelector(store => store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const accessToken = localStorage.getItem("accessToken")

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const closeSidebar = () => {
    setIsOpen(false)
  }

  const logoutHandler = async () => {
    try {
      const res = await axios.post(`http://localhost:8000/api/v1/user/logout`, {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      if (res.data.success) {
        dispatch(setUser(null))
        toast.success(res.data.message)
        closeSidebar()
      }
    } catch (error) {
      console.log(error)
      toast.error("Logout failed")
    }
  }

  const menuItems = [
    {
      icon: <Home size={20} />,
      label: 'Home',
      path: '/',
    },
    {
      icon: <Package size={20} />,
      label: 'Shop by Category',
      submenu: [
        { label: 'Electronics', path: '/products?category=electronics' },
        { label: 'Fashion', path: '/products?category=fashion' },
        { label: 'Home & Garden', path: '/products?category=home' },
        { label: 'Sports', path: '/products?category=sports' },
        { label: 'Books', path: '/products?category=books' },
      ],
    },
    {
      icon: <TrendingUp size={20} />,
      label: 'Trending',
      path: '/products?sort=trending',
    },
    {
      icon: <ShoppingBag size={20} />,
      label: 'Orders & Returns',
      path: '/orders-and-returns',
    },
    {
      icon: <User size={20} />,
      label: 'My Account',
      path: '/profile',
    },
    {
      icon: <Settings size={20} />,
      label: 'Settings',
      path: '/settings',
    },
    user ? {
      icon: <LogOut size={20} />,
      label: 'Logout',
      action: logoutHandler,
    } : {
      icon: <LogIn size={20} />,
      label: 'Login',
      path: '/login',
    },
    {
      icon: <HelpCircle size={20} />,
      label: 'Help & Support',
      submenu: [
        { label: 'FAQs', path: '/help/faq' },
        { label: 'Contact Us', path: '/help/contact' },
        { label: 'Shipping Info', path: '/help/shipping' },
        { label: 'Returns & Refunds', path: '/help/returns' },
      ],
    },
  ]

  return (
    <>
      {/* Hamburger Menu Button */}
      <button
        onClick={toggleSidebar}
        className="sidebar-toggle fixed top-20 left-4 z-30 bg-slate-100 p-2 rounded-lg border border-slate-300 hover:bg-slate-200 transition"
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`sidebar fixed left-0 top-20 h-[calc(100vh-80px)] w-64 bg-slate-50 border-r border-slate-300 shadow-lg z-20 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                {item.submenu ? (
                  <div className="menu-item-group">
                    <details className="group">
                      <summary className="sidebar-item flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-slate-200 transition font-medium text-slate-700">
                        {item.icon}
                        <span>{item.label}</span>
                        <span className="ml-auto text-slate-400 group-open:rotate-180 transition-transform">
                          ▼
                        </span>
                      </summary>
                      <ul className="submenu ml-4 mt-2 space-y-2 bg-white rounded-lg p-3 border-l-4 border-slate-300">
                        {item.submenu.map((subitem, subindex) => (
                          <li key={subindex}>
                            <Link
                              to={subitem.path}
                              onClick={closeSidebar}
                              className="block px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded transition text-sm"
                            >
                              {subitem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </div>
                ) : item.action ? (
                  <button
                    onClick={() => {
                      item.action()
                      closeSidebar()
                    }}
                    className="sidebar-item flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-200 transition font-medium text-slate-700 hover:text-black w-full text-left"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    onClick={closeSidebar}
                    className="sidebar-item flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-200 transition font-medium text-slate-700 hover:text-black"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="sidebar-footer absolute bottom-0 left-0 right-0 p-4 border-t border-slate-300 bg-white">
          <p className="text-xs text-slate-500 text-center">
            eKart © 2024 | All Rights Reserved
          </p>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
