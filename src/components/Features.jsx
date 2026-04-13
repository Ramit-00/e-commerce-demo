import React from 'react'

const Features = () => {
  const features = [
    {
      icon: '🚚',
      title: 'Fast & Free Shipping',
      description: 'Get your orders delivered quickly with our free shipping on all orders over $50.'
    },
    {
      icon: '🔒',
      title: 'Secure Payments',
      description: 'Shop with confidence using our encrypted payment system and multiple payment options.'
    },
    {
      icon: '💬',
      title: '24/7 Customer Support',
      description: 'Our dedicated support team is here to help you anytime, anywhere.'
    },
    {
      icon: '🔄',
      title: 'Easy Returns',
      description: 'Not satisfied? Return any item within 30 days for a full refund.'
    },
    {
      icon: '⭐',
      title: 'Quality Guarantee',
      description: 'All products are carefully selected and come with our quality assurance.'
    },
    {
      icon: '🌍',
      title: 'Global Reach',
      description: 'Shop from anywhere in the world with our international shipping options.'
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose eKart?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the features that make shopping with us a seamless and enjoyable experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
