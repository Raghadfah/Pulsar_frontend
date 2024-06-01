import { useContext } from "react"
import { MinusIcon, PlusIcon, ShoppingCartIcon, XIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Link } from "react-router-dom"

import { Context } from "@/App"
import { Badge } from "./badge"
import { Separator } from "@/components/ui/separator"
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
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">Cart</h2>
              <Button variant="ghost" size="icon">
                <XIcon className="w-5 h-5" />
              </Button>
            </div>
            <div>
              {state.cart.length === 0 && <p>No item</p>}
              {Object.keys(groups).map((key) => {
                const products = groups[key]
                const product = products[0]
                const totalForOne = products.reduce((acc, curr) => {
                  return acc + curr.price
                }, 0)

                return (
                  <div
                    className="grid grid-cols-[64px_1fr_auto] items-center gap-4"
                    key={product.id}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      width={64}
                      height={64}
                      className="rounded-md"
                    ></img>
                    <div className="space-y-1">
                      <h4 className="font-medium">{product.name}</h4>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteFromCart(product.id)}
                        >
                          {" "}
                          <MinusIcon className="w-4 h-4" />
                        </Button>
                        <span className="text-sm">{products.length}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleAddToCart(product)}
                        >
                          {" "}
                          <PlusIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-medium" >{totalForOne} $</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteFromCart(product.id)}
                      >
                        <XIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
            <Separator className="my-6" />
            <div className="flex items-center justify-between">
              <span className="font-medium">Total</span>
              <span className="font-medium">{total.toFixed(2)} $</span>
            </div>
            <div className="flex gap-4 mt-6">
              <Link to="/">
                <Button variant="outline" className="flex-1">
                  Continue Shopping
                </Button>
              </Link>
              <Link to="/checkOut">
                <Button className="flex-1" onClick={handleCheckout}>
                  Checkout
                </Button>
              </Link>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </>
  )
}
