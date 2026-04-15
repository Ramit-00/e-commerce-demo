import React, { useState, useEffect } from 'react'
import ProductComponent from './productComponent'

const ProductPage = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Mock data - replace with API call later
  const mockProducts = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
      name: 'Wireless Bluetooth Headphones',
      price: 89.99,
      originalPrice: 129.99,
      rating: 4.5,
      reviews: 128,
      description: 'High-quality wireless headphones with noise cancellation and premium sound quality',
      inStock: true,
      badge: 'Sale',
      category: 'Electronics'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
      name: 'Smart Watch Series 5',
      price: 299.99,
      originalPrice: 399.99,
      rating: 4.8,
      reviews: 256,
      description: 'Advanced smartwatch with health monitoring, GPS, and long battery life',
      inStock: true,
      badge: 'New',
      category: 'Electronics'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
      name: 'Ergonomic Office Chair',
      price: 249.99,
      originalPrice: 349.99,
      rating: 4.3,
      reviews: 89,
      description: 'Comfortable ergonomic chair designed for long work sessions with lumbar support',
      inStock: true,
      badge: 'Sale',
      category: 'Furniture'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400',
      name: 'Professional Camera Lens',
      price: 599.99,
      originalPrice: 799.99,
      rating: 4.7,
      reviews: 67,
      description: '85mm f/1.4 portrait lens with exceptional image quality and bokeh',
      inStock: false,
      badge: null,
      category: 'Photography'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
      name: 'Mechanical Gaming Keyboard',
      price: 149.99,
      originalPrice: 199.99,
      rating: 4.6,
      reviews: 203,
      description: 'RGB backlit mechanical keyboard with blue switches for gaming enthusiasts',
      inStock: true,
      badge: 'Popular',
      category: 'Electronics'
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      name: 'Wireless Speaker',
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.4,
      reviews: 145,
      description: 'Portable wireless speaker with 360-degree sound and waterproof design',
      inStock: true,
      badge: 'Sale',
      category: 'Electronics'
    }
  ]

  const categories = ['All', ...new Set(mockProducts.map(product => product.category))]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(mockProducts)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  if (loading) {
    return (
      <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-slate-600">Loading products...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">All Products</h1>
          <p className="text-lg text-slate-600">Discover our complete collection of premium products</p>
        </div>

        {/* Filters */}
        <div className="mb-8 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="flex-1 w-full md:w-auto">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="w-full md:w-auto">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full md:w-48 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-slate-600">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductComponent
                key={product.id}
                {...product}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-slate-500 text-lg">No products found matching your criteria.</div>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('All')
              }}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductPage