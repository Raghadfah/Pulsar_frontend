import api from "@/api"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { NavBar } from "@/components/ui/navbar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

export function ProductDetails() {
  const { id } = useParams<string>()
  console.log("id in product details ", id)

  const getProductById = async (id: string | undefined) => {
    try {
      const res = await api.get(`/products/${id}`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const { data, isPending, isError } = useQuery({
    queryKey: ["products", id],
    queryFn: () => getProductById(id)
  })
  console.log("data in product details", data)

  return(
    <div>
      <NavBar />
      <>
        <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
          <div className="grid gap-4 md:gap-10 items-start">
            <div className="grid gap-4">
              <h1 className="font-bold text-3xl lg:text-4xl">{data.name}</h1>
              <div className="flex justify-center gap-4">
                <div className="text-4xl font-bold">${data.price}</div>
              </div>
              <div>
                <p>{data.description}</p>
              </div>
            </div>
            <form className="grid gap-4 md:gap-10">
              <div className="grid gap-2 justify-center">
                <Label className="text-base" htmlFor="quantity">
                  Quantity
                </Label>
                <Select defaultValue="1">
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
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
      </>
    </div>
  )
}