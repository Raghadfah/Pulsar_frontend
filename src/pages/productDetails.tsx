import { useQuery } from "@tanstack/react-query"
import { Link, useParams } from "react-router-dom"

import api from "@/api"
import { Label } from "@/components/ui/label"
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { NavBar } from "@/components/ui/navbar"
import { FormEvent, useContext, useState } from "react"
import { Context } from "@/App"
import { Product } from "@/types"

export function ProductDetails() {
  const context = useContext(Context)
  if (!context) throw Error("Context is missing")
  const { handleAddToCart } = context

  const { id } = useParams<string>()
  const [selectedQuantity, setSelectedQuantity] = useState(1)

  const getProductById = async (id: string | undefined) => {
    try {
      const res = await api.get(`/products/${id}`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const { data, isPending, isError, error } = useQuery<Product>({
    queryKey: ["products", id],
    queryFn: () => getProductById(id)
  })

  if (isPending) {
    return <p>Data is loading....</p>
  }
  if (isError) {
    return <span>Error: {error.message}</span>
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const quantities = [...Array(selectedQuantity).keys()]

    quantities.map(() => {
      handleAddToCart(data)
    })
  }

  const handleChange = (value: string) => {
    setSelectedQuantity(Number(value))
  }

  const dividedBy4 = data.quantity < 10 ? 1 : Math.ceil(data.quantity / 4)
  const availableQuantity = [...Array(dividedBy4).keys()]

  return (
    <>
      <NavBar />
      <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
        <div className="grid gap-4 md:gap-10 items-start mt-8">
          <div className="grid gap-4">
            <h1 className="font-bold text-3xl lg:text-4xl">{data.name}</h1>
            <div className="flex justify-center gap-4">
              <div className="text-4xl font-bold">${data.price}</div>
            </div>
            <div>
              <p>{data.description}</p>
            </div>
          </div>
          <form className="grid gap-4 md:gap-10" onSubmit={handleSubmit}>
            <div className="grid gap-2 justify-center">
              <Label className="text-base" htmlFor="quantity">
                Quantity
              </Label>
              <Select defaultValue="1" onValueChange={handleChange}>
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {availableQuantity.map((x) => {
                    const value = ++x
                    return (
                      <SelectItem value={value.toString()} key={value}>
                        {value}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>
            <Button size="lg">Add to Cart</Button>
          </form>
        </div>
        <div className="grid gap-4">
          <img
            alt={data.name}
            className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
            height={600}
            src={data.image}
            width={600}
          />
        </div>
      </div>
      <section className="w-full py-12">
        <div className="container grid gap-6 md:gap-8 px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8"></div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <div className="relative group">
              <Link className="absolute inset-0 z-10" to="">
                <span className="sr-only">View</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
