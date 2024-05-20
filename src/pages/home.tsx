import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { useContext } from "react"
import { Context } from "@/App"


import { Product } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import api from "@/api"
import { Hero } from "@/components/ui/hero"
import {NavBar} from "@/components/ui/navbar"
import { Link } from "react-router-dom"


export function Home() {
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
  const context = useContext(Context)
  if (!context) throw Error("context is missing ")
  const { handleAddToCart } = context
  return (
    <>
    <NavBar/>
    <Hero/>
      <h2 className="text-2xl uppercase mb-10">Products</h2>
      <section className="flex flex-col md:flex-row gap-4 justify-between max-w-6xl mx-auto">
        {data?.map((product) => (
          <Card key={product.id} className="w-[350px]">
            <CardHeader>
              <img alt= {product.name} src= {product.image}/>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{product.price} $</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button className= "m-8"variant="outline">
                <Link to={`/products/${product.id}`}>Details</Link>
              </Button>
            <Button className="w-full" onClick={() => handleAddToCart(product)}>
                Add to cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </section>
      {error && <p className="text-red-500">{error.message}</p>}
    </>
  )
}
