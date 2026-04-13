import React from 'react'

const ProductPage = () => {
  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Products</h1>
        <p className="text-slate-600 mb-6">Browse all available products and click any item to view details or add to cart.</p>
        <div className="rounded-2xl border border-slate-200 p-6 bg-slate-50">
          <p className="text-slate-500">This page is ready for your product list or product grid component.</p>
        </div>
      </div>
    </div>
  )
}

export default ProductPage