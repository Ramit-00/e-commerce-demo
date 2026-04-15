import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Package, AlertCircle, LogIn, ShoppingBag } from 'lucide-react'

const ReturnsAndOrders = () => {
  const { user } = useSelector(store => store.user)
  const navigate = useNavigate()

  // If user is not logged in
  if (!user) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-red-100 p-4 rounded-full">
                <AlertCircle size={48} className="text-red-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">
              Access Restricted
            </h1>
            <p className="text-lg text-slate-600 mb-2">
              You need to login to view your orders and returns.
            </p>
            <p className="text-slate-500 mb-8">
              Sign in to your account to track your purchases and manage returns.
            </p>
            <Button
              onClick={() => navigate('/login')}
              className="bg-black text-white hover:bg-gray-800 px-8 py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto"
            >
              <LogIn size={20} />
              Go to Login
            </Button>
            <p className="text-sm text-slate-500 mt-6">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/signup')}
                className="text-black font-semibold hover:underline"
              >
                Sign up here
              </button>
            </p>
          </div>
        </div>
      </div>
    )
  }

  // If user is logged in but has no orders
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Your Orders & Returns
          </h1>
          <p className="text-slate-600">
            Track and manage your purchases in one place
          </p>
        </div>

        {/* Empty State */}
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 p-4 rounded-full">
              <Package size={48} className="text-blue-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            No Orders Yet
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            You don't have any orders or returns at the moment. Start shopping to see your orders here!
          </p>
          <Button
            onClick={() => navigate('/products')}
            className="bg-black text-white hover:bg-gray-800 px-8 py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto"
          >
            <ShoppingBag size={20} />
            Continue Shopping
          </Button>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Orders Card */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <Package size={24} className="text-slate-600" />
              <h3 className="text-lg font-semibold text-slate-900">Orders</h3>
            </div>
            <p className="text-slate-600 text-sm">
              Once you place an order, it will appear here. You can track your shipment, view order details, and manage your purchases.
            </p>
          </div>

          {/* Returns Card */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle size={24} className="text-slate-600" />
              <h3 className="text-lg font-semibold text-slate-900">Returns</h3>
            </div>
            <p className="text-slate-600 text-sm">
              Need to return something? Initiate a return request for any eligible order within 30 days of delivery.
            </p>
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-slate-100 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-3">Need Help?</h3>
          <p className="text-slate-600 mb-4">
            Have questions about orders or returns? Check our help center or contact our support team.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              onClick={() => navigate('/help/faq')}
              className="border-slate-300 hover:bg-slate-50"
            >
              View FAQs
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/help/contact')}
              className="border-slate-300 hover:bg-slate-50"
            >
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReturnsAndOrders
