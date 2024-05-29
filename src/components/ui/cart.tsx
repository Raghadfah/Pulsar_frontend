import { useContext } from "react"
import { ShoppingCartIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Link } from "react-router-dom"

import { Context } from "@/App"
import { Badge } from "./badge"
import { Button } from "./button"
import { Product } from "@/types"
import api from "@/api"

type OrderItem = {
  quantity: number
  productId: string
}
type OrderCheckout = {
  addressId: string
  items: OrderItem[]
}

export function Cart() {
  const context = useContext(Context)
  if (!context) throw Error("Context is missing")
  const { state, handleDeleteFromCart, handleAddToCart, handleRemoveCart } = context

  const groups = state.cart.reduce((acc, obj) => {
    const key = obj.id
    const curGroup = acc[key] ?? []
    return { ...acc, [key]: [...curGroup, obj] }
  }, {} as { [productId: string]: Product[] })

  const total = state.cart.reduce((acc, curr) => {
    return acc + curr.price
  }, 0)

  const checkoutOrder: OrderCheckout = {
    addressId: "",
    items: []
  }
  Object.keys(groups).forEach((key) => {
    const products = groups[key]

    checkoutOrder.items.push({
      quantity: products.length,
      productId: key
    })
  })
  
  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await api.post("/orders/checkout", checkoutOrder, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (res.status === 201) {
        handleRemoveCart()
      }
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  return (
    <>
      <div className="cart">
        <Popover>
          <PopoverTrigger asChild>
            <Link className="relative" to="#">
              <ShoppingCartIcon className="h-8 w-8" />
              <Badge className="absolute -top-2 -right-4 rounded-full bg-orange-700 px-1 py-1 text-xs text-white">
                ({Object.keys(groups).length})
              </Badge>
            </Link>
          </PopoverTrigger>
          <PopoverContent className="w-300">
            <div>
              {state.cart.length === 0 && <p>No item</p>}
              {Object.keys(groups).map((key) => {
                const products = groups[key]
                const product = products[0]
                const totalForOne = products.reduce((acc, curr) => {
                  return acc + curr.price
                }, 0)

                return (
                  <div key={product.id}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-10 object-contain"
                    ></img>
                    <h4>{product.name}</h4>
                    <span>({products.length})</span>
                    <span>{totalForOne}</span>
                    <Button onClick={() => handleAddToCart(product)}>+</Button>
                    <Button onClick={() => handleDeleteFromCart(product.id)}>-</Button>
                  </div>
                )
              })}
            </div>
            <p>Total: {total}</p>
            <Link to="/">Continue shopping</Link>
            <Link to="/checkOut">
              <Button onClick={handleCheckout}>Checkout</Button>
            </Link>
          </PopoverContent>
        </Popover>
      </div>
    </>
  )
}
