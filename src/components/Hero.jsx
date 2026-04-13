import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-b from-white to-gray-100 overflow-hidden">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div className="absolute inset-0 bg-[linear-gradient(#000_1px,transparent_1px),linear-gradient(to_right,#000_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT CONTENT */}
          <div className="text-center lg:text-left">

            {/* Badge */}
            <div className="inline-block px-4 py-1 mb-6 text-sm font-medium text-gray-700 bg-gray-200 rounded-full">
              Premium Electronics Store
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Smart Tech.
              <span className="block text-gray-700">
                Better Living.
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Upgrade your lifestyle with cutting-edge gadgets designed for performance, style, and reliability — all at competitive prices.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/products"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Explore Products
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/deals"
                className="flex items-center justify-center px-8 py-4 border border-gray-300 text-gray-800 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300"
              >
                View Offers
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm text-gray-500">
              <span>✔ Free Shipping</span>
              <span>✔ 1 Year Warranty</span>
              <span>✔ Secure Payment</span>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="relative flex justify-center">
            <div className="relative w-full max-w-md">

              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-gray-300 to-transparent rounded-3xl blur-2xl opacity-40"></div>

              {/* Image */}
              <img
                src="/mobile.png"
                alt="Modern electronics"
                className="relative z-10 w-full rounded-3xl shadow-2xl"
              />

              {/* Floating Card */}

              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white px-6 py-3 rounded-xl shadow-lg border border-gray-200 margin-top-4">
                <p className="text-sm font-medium text-gray-700">
                  Starting at ₹9,999
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Hero
