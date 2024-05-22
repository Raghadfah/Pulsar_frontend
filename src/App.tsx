import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { Home } from "./pages/home"
import "./App.css"
import { ProductDetails } from "./pages/productDetails"
import { createContext, useEffect, useState } from "react"
import { DecodedUser, Product } from "./types"
import { Dashboard } from "./pages/dashboard"
import { Signup } from "./pages/signup"
import { PrivateRoute } from "./components/ui/privateRoute"
import { Login } from "./pages/login"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/products/:id",
    element: <ProductDetails />
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    )
  }
])
type GlobalContextType = {
  state: GlobalState
  handleAddToCart: (product: Product) => void
  handleDeleteFromCart: (id: string) => void
  handleStoreUser: (user: DecodedUser) => void
  handleRemoveCart: () => void
}
type GlobalState = {
  cart: Product[]
  user: DecodedUser | null
}
export const Context = createContext<GlobalContextType | null>(null)

function App() {
  const [state, setState] = useState<GlobalState>({
    cart: [],
    user: null
  })
  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) {
      const decodedUser = JSON.parse(user)
      setState({
        ...state,
        user: decodedUser
      })
    }
  }, [])

  const handleAddToCart = (product: Product) => {
    const isDuplicated = state.cart.find((cartItem) => cartItem.id === product.id)
    if (isDuplicated) return
    setState({
      ...state,
      cart: [...state.cart, product]
    })
  }
  const handleDeleteFromCart = (id: string) => {
    const cart = state.cart
    const index = state.cart.findIndex((item) => item.id !== id)
    cart.splice(index, 1)
    setState({
      ...state,
      cart: cart
    })
  }
  const handleRemoveCart = (id: string) => {
    setState({
      ...state,
      cart: []
    })
  }
  const handleStoreUser = (user: DecodedUser) => {
    setState({
      ...state,
      user
    })
  }
  return (
    <div className="App">
      <Context.Provider 
      value={{ state, handleAddToCart, handleDeleteFromCart, handleStoreUser, handleRemoveCart }}>
        <RouterProvider router={router} />
      </Context.Provider>
    </div>
  )
}
export default App
