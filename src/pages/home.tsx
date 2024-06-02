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
import { Footer } from "@/components/ui/footer"
import "../Style/backgroundStyle.css"
import { PageNumber } from "@/components/ui/pageNumber"

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
      <script />
      <section className="hero">
        <div className="hero-content ">
          <h1 className=" text-start">WELCOME TO</h1>
          <h1 className="highlight text-start">PULSAR</h1>
          <a href="/" className="button">
            Shop
          </a>
          <p className=" text-end">
            Discover the universe
            <br /> with Pulsar
          </p>
        </div>
        <div className="hero-image z-10 absolute pt-[5%]">
          <img className=" mx-auto pt-[40%] md:w-auto w-1/2 md:pt-[3%]" src="images/planet.gif"></img>
        </div>
      </section>
      <h2 className="text-2xl uppercase mb-10 font-bold text-[#ffe6b4]">Products</h2>
      <section className="flex flex-wrap flex-col md:flex-row justify-center max-w-6x1 mx-auto mt-20 gap-4 ">
        {data?.map((product) => {
          const products = state.cart.filter((p) => p.id === product.id)
          const inStock = product.quantity > products.length

          return (
            <div key={product.id} className="card">
              <Card key={product.id} className="h-full flex flex-col items-center justify-between">
                <CardHeader>
                  <img alt={product.name} src={product.image} />
                  <CardTitle>{product.name}</CardTitle>
                  <CardDescription>{product.description.slice(0, 100)}...</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{product.price} $</p>
                </CardContent>
                <CardFooter>
                  <Button>
                    <Link to={`/products/${product.id}`}>Details</Link>
                  </Button>
                  <Button disabled={!inStock} onClick={() => handleAddToCart(product)}>
                    {inStock ? "Add to cart" : "Out of stock"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )
        })}
      </section>
      {error && <p className="text-red-500">{error.message}</p>}
      <PageNumber />
      <Footer />
    </>
  )
}
