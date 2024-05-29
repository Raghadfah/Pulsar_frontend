import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useContext, useState } from "react"
import { CardText } from "react-bootstrap"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select
} from "@/components/ui/select"
import { NavBar } from "@/components/ui/navbar"
import api from "@/api"
import { Context } from "@/App"
import { Address, OrderCheckout, Product } from "@/types"

export default function CheckOut() {
  const context = useContext(Context)
  if (!context) throw Error("Context is missing")

  const { state, handleRemoveCart } = context
  const queryClient = useQueryClient()

  const [error, setError] = useState("")

  const checkoutOrder: OrderCheckout = {
    addressId: "",
    items: []
  }

  const groups = state.cart.reduce((acc, obj) => {
    const key = obj.id
    const curGroup = acc[key] ?? []
    return { ...acc, [key]: [...curGroup, obj] }
  }, {} as { [key: string]: Product[] })

  const keys = Object.keys(groups)

  const total = state.cart.reduce((acc, curr) => {
    return acc + curr.price
  }, 0)
  Object.keys(groups).forEach((key) => {
    const products = groups[key]
    checkoutOrder.items.push({
      quantity: products.length,
      productId: key
    })
  })

  const getAddressesById = async (id: string | undefined) => {
    try {
      const res = await api.get(`/addresses/user/${id}`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const handleCheckout = async () => {
    try {
      checkoutOrder.addressId = selectedAddress
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
  const { data: addresses } = useQuery<Address[]>({
    queryKey: ["addresses", state.user?.nameidentifier],
    queryFn: () => getAddressesById(state.user?.nameidentifier)
  })

  let defaultAddress = ""
  if (addresses) {
    defaultAddress = addresses[0].id
  }
  const [selectedAddress, setSelectedAddress] = useState(defaultAddress)

  const handleRadioChange = (value: string) => {

    setSelectedAddress(value)
  }
  const [address, setAddress] = useState({
    country: "",
    city: "",
    street: "",
    zip_code: 0
  })

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAddress({ ...address, [name]: value })
  }
  const postAddress = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await api.post("/addresses", address, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const handleAddressSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await postAddress()
    queryClient.invalidateQueries({ queryKey: ["addresses"] })
  }
  return (
    <>
      <NavBar />
      <div className="checkout-container">
        <h1>Checkout</h1>

        {error && <p className="error">{error}</p>}
      </div>
      <main className="container mx-auto my-8 grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="mt-4 space-y-4">
          {keys.map((key) => {
                  const products = groups[key]
                  const product = products[0]
                  const totalForOne = products.reduce((acc, curr) => acc + curr.price, 0)
                  return (
                    <div key={product.id} className="flex items-center gap-4 rounded-lg border bg-purple p-4 shadow-sm dark:border-gray-700 dark:bg-gray-950">
                    <img
                      alt={product.name}
                      className="rounded-md"
                      height={80}
                      src={product.image}
                      style={{
                        aspectRatio: "80/80",
                        objectFit: "cover"
                      }}
                      width={80}
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-medium">{product.name}</h3>
                      {/* <p className="text-gray-500 dark:text-gray-400">{product.price}</p> */}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="icon" variant="outline">
                        <MinusIcon />
                      </Button>
                      <span>{products.length}</span>
                      <Button size="icon" variant="outline">
                        <PlusIcon />
                      </Button>
                    </div>
                    <div className="text-right font-medium">{totalForOne}</div>
                  </div>
                  )
                })}
            
          </div>
        </div>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <ul>
                {Object.keys(groups).map((key) => {
                  const products = groups[key]
                  const product = products[0]
                  const totalForOne = products.reduce((acc, curr) => acc + curr.price, 0)
                  return (
                    <li key={product.id}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 object-contain"
                      />
                      <span>
                        {product.name} ({products.length}) - ${totalForOne}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>$139.98</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Taxes</span>
                <span>$11.20</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between font-medium">
                <span>Total</span>
                <span>{total}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Shipping & Payment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input disabled id="name" placeholder={state.user?.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input disabled id="email" placeholder={state.user?.emailaddress} type="email" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="address">Address:</label>
                <Input
                  id="country"
                  name="country"
                  placeholder="Country"
                  onChange={handleAddressChange}
                  className="input"
                />
                <Input
                  id="city"
                  name="city"
                  placeholder="City"
                  onChange={handleAddressChange}
                  className="input"
                />
                <Input
                  id="street"
                  name="street"
                  placeholder="Street"
                  onChange={handleAddressChange}
                  className="input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="payment">Payment Method</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="credit-card">Credit Card</SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                    <SelectItem value="apple-pay">Apple Pay</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardText>
              <Link to="/thankYou">
                <Button className="w-full" onClick={handleCheckout}>
                  Place Order
                </Button>
              </Link>
            </CardText>
          </Card>
        </div>
      </main>
      <footer />
    </>
  )
}

function MinusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}
