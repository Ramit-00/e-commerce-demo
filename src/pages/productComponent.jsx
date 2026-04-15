import React, { useState } from 'react'
import { ShoppingCart, Star, Heart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/cartSlice'
import { toast } from 'sonner'

const ProductComponent = ({ 
  id = 1,
  image = 'https://via.placeholder.com/400x300?text=Product',
  name = 'Product Name',
  price = 99.99,
  originalPrice = 129.99,
  rating = 4.5,
  reviews = 128,
  description = 'High-quality product with excellent features',
  inStock = true,
  badge = 'Sale'
}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [added, setAdded] = useState(false)

  const discount = Math.round(((originalPrice - price) / originalPrice) * 100)

  const handleAddToCart = () => {
    if (!inStock) return

    const product = {
      id,
      name,
      price,
      image,
      originalPrice,
      rating,
      reviews,
      description,
      inStock
    }

    dispatch(addToCart({ product, quantity }))
    setAdded(true)
    toast.success(`${name} added to cart!`)

    setTimeout(() => setAdded(false), 2000)
  }

  const handleQuantityChange = (value) => {
    if (value >= 1) {
      setQuantity(value)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-100 h-64">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
        
        {/* Badge */}
        {badge && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {badge}
          </div>
        )}

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
            -{discount}%
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute bottom-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition"
        >
          <Heart 
            size={20} 
            className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}
          />
        </button>
      </div>

      {/* Content Container */}
      <div className="p-4">
        {/* Rating */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">({reviews})</span>
        </div>

        {/* Product Name */}
        <h3 
          className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 cursor-pointer transition-colors"
          onClick={() => navigate(`/product/${id}`)}
        >
          {name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {description}
        </p>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-bold text-gray-900">${price.toFixed(2)}</span>
          {originalPrice > price && (
            <span className="text-sm text-gray-500 line-through">${originalPrice.toFixed(2)}</span>
          )}
        </div>

        {/* Stock Status */}
        <div className="mb-4">
          {inStock ? (
            <span className="text-sm text-green-600 font-semibold">In Stock</span>
          ) : (
            <span className="text-sm text-red-600 font-semibold">Out of Stock</span>
          )}
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center gap-2 mb-4">
          <label className="text-sm font-medium text-gray-700">Qty:</label>
          <div className="flex items-center border border-gray-300 rounded">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
            >
              −
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
              className="w-10 text-center py-1 border-0 focus:outline-none"
            />
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
            >
              +
            </button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!inStock}
          className={`w-full py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors ${
            added
              ? 'bg-green-500 text-white'
              : inStock
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <ShoppingCart size={18} />
          {added ? 'Added to Cart!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}

export default ProductComponent