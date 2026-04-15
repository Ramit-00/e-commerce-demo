import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ShoppingCart, Star, Heart, ArrowLeft, Truck, Shield, RotateCcw } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/cartSlice'
import { toast } from 'sonner'

const SingleProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [added, setAdded] = useState(false)

  // Mock product data - replace with API call later
  const mockProducts = [
    {
      id: 1,
      images: [
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600',
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600'
      ],
      name: 'Wireless Bluetooth Headphones',
      price: 89.99,
      originalPrice: 129.99,
      rating: 4.5,
      reviews: 128,
      description: 'Experience premium sound quality with our wireless Bluetooth headphones. Featuring active noise cancellation, 30-hour battery life, and comfortable over-ear design perfect for long listening sessions.',
      features: [
        'Active Noise Cancellation',
        '30-hour battery life',
        'Bluetooth 5.0 connectivity',
        'Comfortable over-ear design',
        'Built-in microphone',
        'Quick charge technology'
      ],
      specifications: {
        'Driver Size': '40mm',
        'Frequency Response': '20Hz - 20kHz',
        'Impedance': '32Ω',
        'Weight': '250g',
        'Charging Time': '2 hours',
        'Warranty': '2 years'
      },
      inStock: true,
      badge: 'Sale',
      category: 'Electronics',
      reviewsList: [
        { id: 1, user: 'John D.', rating: 5, comment: 'Excellent sound quality and very comfortable!', date: '2024-01-15' },
        { id: 2, user: 'Sarah M.', rating: 4, comment: 'Great battery life, but a bit heavy for running.', date: '2024-01-10' },
        { id: 3, user: 'Mike R.', rating: 5, comment: 'Noise cancellation works perfectly. Highly recommend!', date: '2024-01-08' }
      ]
    },
    {
      id: 2,
      images: [
        'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600',
        'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=600',
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600'
      ],
      name: 'Smart Watch Series 5',
      price: 299.99,
      originalPrice: 399.99,
      rating: 4.8,
      reviews: 256,
      description: 'Stay connected and healthy with our advanced smartwatch. Track your fitness, monitor your health metrics, and stay notified with a beautiful AMOLED display.',
      features: [
        'Heart rate monitoring',
        'GPS tracking',
        'AMOLED display',
        '7-day battery life',
        'Water resistant',
        'Sleep tracking',
        'Multiple sports modes'
      ],
      specifications: {
        'Display': '1.4" AMOLED',
        'Resolution': '450 x 450',
        'Battery Life': '7 days',
        'Water Resistance': '50m',
        'Sensors': 'Heart Rate, GPS, Accelerometer',
        'Connectivity': 'Bluetooth 5.0, Wi-Fi',
        'Warranty': '1 year'
      },
      inStock: true,
      badge: 'New',
      category: 'Electronics',
      reviewsList: [
        { id: 1, user: 'Emma L.', rating: 5, comment: 'Amazing battery life and accurate health tracking!', date: '2024-01-20' },
        { id: 2, user: 'David K.', rating: 4, comment: 'Great features, but the band could be more comfortable.', date: '2024-01-18' }
      ]
    }
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundProduct = mockProducts.find(p => p.id === parseInt(id))
      if (foundProduct) {
        setProduct(foundProduct)
        setSelectedImage(0)
      }
      setLoading(false)
    }, 500)
  }, [id])

  const handleQuantityChange = (value) => {
    if (value >= 1 && value <= 10) {
      setQuantity(value)
    }
  }

  const handleAddToCart = () => {
    if (!product.inStock) return

    const cartProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      originalPrice: product.originalPrice,
      rating: product.rating,
      reviews: product.reviews,
      description: product.description,
      inStock: product.inStock
    }

    dispatch(addToCart({ product: cartProduct, quantity }))
    setAdded(true)
    toast.success(`${product.name} added to cart!`)

    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-slate-600">Loading product...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-slate-900 mb-4">Product Not Found</h1>
            <p className="text-slate-600 mb-6">The product you're looking for doesn't exist.</p>
            <button
              onClick={() => navigate('/products')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Products
            </button>
          </div>
        </div>
      </div>
    )
  }

  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/products')}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Products
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-white rounded-2xl shadow-lg overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-blue-500' : 'border-slate-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                {product.badge && (
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {product.badge}
                  </span>
                )}
                {discount > 0 && (
                  <span className="bg-green-500 text-white px-2 py-1 rounded text-sm font-bold">
                    -{discount}%
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-bold text-slate-900 mb-2">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-slate-600">({product.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-slate-900">${product.price.toFixed(2)}</span>
                {product.originalPrice > product.price && (
                  <span className="text-xl text-slate-500 line-through">${product.originalPrice.toFixed(2)}</span>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">Description</h2>
              <p className="text-slate-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">Key Features</h2>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-slate-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              {product.inStock ? (
                <span className="text-green-600 font-semibold flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  In Stock
                </span>
              ) : (
                <span className="text-red-600 font-semibold flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  Out of Stock
                </span>
              )}
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <label className="text-slate-700 font-medium">Quantity:</label>
                <div className="flex items-center border border-slate-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="px-3 py-2 text-slate-600 hover:bg-slate-100"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    className="w-16 text-center py-2 border-0 focus:outline-none"
                    min="1"
                    max="10"
                  />
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="px-3 py-2 text-slate-600 hover:bg-slate-100"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors ${
                    added
                      ? 'bg-green-500 text-white'
                      : product.inStock
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart size={20} />
                  {added ? 'Added to Cart!' : 'Add to Cart'}
                </button>

                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    isFavorite
                      ? 'border-red-500 bg-red-50'
                      : 'border-slate-300 hover:border-slate-400'
                  }`}
                >
                  <Heart
                    size={20}
                    className={isFavorite ? 'fill-red-500 text-red-500' : 'text-slate-600'}
                  />
                </button>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-slate-100 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Truck className="text-slate-600" size={20} />
                <span className="text-slate-700">Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="text-slate-600" size={20} />
                <span className="text-slate-700">2-year warranty included</span>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="text-slate-600" size={20} />
                <span className="text-slate-700">30-day return policy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between py-2 border-b border-slate-100">
                <span className="font-medium text-slate-700">{key}:</span>
                <span className="text-slate-600">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Customer Reviews</h2>
          <div className="space-y-6">
            {product.reviewsList.map(review => (
              <div key={review.id} className="border-b border-slate-100 pb-6 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900">{review.user}</span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-slate-500">{review.date}</span>
                </div>
                <p className="text-slate-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleProduct