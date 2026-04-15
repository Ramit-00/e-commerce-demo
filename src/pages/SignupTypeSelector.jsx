import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { User, Store } from 'lucide-react'

const SignupTypeSelector = () => {
  const navigate = useNavigate()

  const handleUserSignup = () => {
    navigate('/signup/user')
  }

  const handleSellerSignup = () => {
    navigate('/signup/seller')
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Create Account
          </h1>
          <p className="text-slate-600">
            Choose how you'd like to join eKart
          </p>
        </div>

        {/* Selection Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Customer Signup Card */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <User size={24} className="text-slate-600" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">
                Customer
              </h2>
              <p className="text-slate-600 text-sm mb-6">
                Shop and purchase products on eKart
              </p>
              <Button
                onClick={handleUserSignup}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2 rounded-lg font-medium"
              >
                Continue as Customer
              </Button>
            </div>
          </div>

          {/* Seller Signup Card */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Store size={24} className="text-slate-600" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">
                Seller
              </h2>
              <p className="text-slate-600 text-sm mb-6">
                Sell your products and grow your business
              </p>
              <Button
                onClick={handleSellerSignup}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2 rounded-lg font-medium"
              >
                Continue as Seller
              </Button>
            </div>
          </div>
        </div>

        {/* Footer Text */}
        <div className="text-center mt-8">
          <p className="text-slate-600 text-sm">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-slate-900 font-medium hover:underline"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignupTypeSelector