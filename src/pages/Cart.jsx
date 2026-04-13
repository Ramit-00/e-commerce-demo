import react from 'react'

const Cart = () =>{
  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Your Cart</h1>
        <p className="text-slate-600 mb-6">Review the items in your cart and proceed to checkout when ready.</p>
        <div className="rounded-2xl border border-slate-200 p-6 bg-slate-50">
          <p className="text-slate-500">Your cart is currently empty. Start adding products to see them here!</p>
        </div>
      </div>
    </div>
  )
}

export default Cart