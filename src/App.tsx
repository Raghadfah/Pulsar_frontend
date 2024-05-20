import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { Home } from "./pages/home"
import "./App.css"

import { ProductDetails } from "./pages/productDetails"
import { createContext, useState } from "react"
import { Product } from "./types"
import { Dashboard } from "./pages/dashboard"
import { LogIn } from "lucide-react"
import { Signup } from "./pages/signup"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <LogIn />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/products/:productId",
    element: <ProductDetails />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  }
])
type GlobalContextType = {
  state: GlobalState
  handleAddToCart: (product: Product) => void
  handleDeleteFromCart: (id: string) => void
}
type GlobalState = {
  cart: Product[]
}
export const Context = createContext<GlobalContextType | null>(null)

function App() {
  const [state, setState] = useState<GlobalState>({
    cart: []
  })
  const handleAddToCart = (product: Product) => {
    const isDuplicated = state.cart.find((cartItem) => cartItem.id === product.id)
    if (isDuplicated) return
    setState({
      ...state,
      cart: [...state.cart, product]
  })}
    const handleDeleteFromCart = (id: string) => {
      const filteredCart = state.cart.filter((item) => item.id !== id)
      setState({
        ...state,
        cart: filteredCart}
      )
    }
  return (
    <div className="App">
      <Context.Provider value={{ state, handleAddToCart, handleDeleteFromCart}}>
        <RouterProvider router={router} />
      </Context.Provider>
    </div>
  )
}
export default App
