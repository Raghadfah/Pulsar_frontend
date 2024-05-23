import { Link } from "react-router-dom"
import { useContext } from "react"
import { useQuery } from "@tanstack/react-query"

import { Product } from "@/types"
import { Context } from "@/App"
import { Button } from "@/components/ui/button"
import api from "@/api"
import { Hero } from "@/components/ui/hero"
import { NavBar } from "@/components/ui/navbar"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

export function Home() {
  const context = useContext(Context)
  if (!context) throw Error("context is missing ")
  const { handleAddToCart, state } = context

  const getProducts = async () => {
    try {
      const res = await api.get("/products")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const { data, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts
  })

  return (
    <>
      <NavBar />
      <Hero />
      <h2 className="text-2xl uppercase mb-10">Products</h2>
      <section className="flex flex-col md:flex-row gap-4 justify-between max-w-6xl mx-auto">
        {data?.map((product) => {
          const products = state.cart.filter((p) => p.id === product.id)
          const inStock = product.quantity > products.length

          return (
            <Card key={product.id} className="w-[350px]">
              <CardHeader>
                <img alt={product.name} src={product.image} />
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{product.price} $</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button className="m-8" variant="outline">
                  <Link to={`/products/${product.id}`}>Details</Link>
                </Button>
                <Button
                  className="w-full"
                  disabled={!inStock}
                  onClick={() => handleAddToCart(product)}
                >
                  {inStock ? "Add to cart" : "Out of stock"}
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </section>
      {error && <p className="text-red-500">{error.message}</p>}
    </>
  )
}
