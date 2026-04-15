import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalItems: 0,
    totalPrice: 0
  },
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity } = action.payload
      const existingItem = state.items.find(item => item.id === product.id)

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        state.items.push({
          ...product,
          quantity: quantity
        })
      }

      // Recalculate totals
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0)
      state.totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
    },
    removeFromCart: (state, action) => {
      const productId = action.payload
      state.items = state.items.filter(item => item.id !== productId)

      // Recalculate totals
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0)
      state.totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload
      const item = state.items.find(item => item.id === productId)

      if (item && quantity > 0) {
        item.quantity = quantity

        // Recalculate totals
        state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0)
        state.totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
      }
    },
    clearCart: (state) => {
      state.items = []
      state.totalItems = 0
      state.totalPrice = 0
    }
  }
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer