import { Context } from "@/App"
import api from "@/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { NavBar } from "@/components/ui/navbar"
import { Product } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { useContext } from "react"
import { Link, useParams } from "react-router-dom"



export function ProductByCategory(){

    const provider = useContext(Context)
  if (!provider) throw Error("Context is missing")
  const { state, handleAddToCart } = provider
  const { id } = useParams<string>()
  
  const getProductsById = async (id: string | undefined) => {
    try {
      const res = await api.get(`/products/section/${id}`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const { data, error } = useQuery<Product[]>({
    queryKey: ["products", id],
    queryFn: () => getProductsById(id)
  })

    return(
        <>
        <NavBar/>
        <h2 className="text-2xl uppercase mb-10">Products</h2>
        <section className="flex flex-col md:flex-row gap-4 justify-between max-w-6xl mx-auto">
          {data?.map((product) => {
            console.log("product",product);
            
            const products = state.cart.filter((p) => p.id === product.id)
            const inStock = product.quantity > products.length
  
            return (
              <div key={product.id} className="card">
              <Card key={product.id} >
                <CardHeader>
                  <img alt={product.name} src={product.image} />
                  <CardTitle>{product.name}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{product.price} $</p>
                </CardContent>
                <CardFooter>
                  <Button >
                    <Link to={`/products/${product.id}`}>Details</Link>
                  </Button>
                  <Button
                   
                    disabled={!inStock}
                    onClick={() => handleAddToCart(product)}
                  >
                    {inStock ? "Add to cart" : "Out of stock"}
                  </Button>
                </CardFooter>
              </Card>
              </div>
            )
          })}
        </section>
        {error && <p className="text-red-500">{error.message}</p>}
        </>
    )
}