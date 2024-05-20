import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query"
import { createContext, useState } from "react"

import api from "@/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Product } from "@/types"
import { Context } from "@/App"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from "@radix-ui/react-alert-dialog"
import { AlertDialogFooter, AlertDialogHeader } from "@/components/ui/alert-dialog"
import { EditDialog } from "@/components/ui/editDialog"


export function Dashboard() {
  const queryClient = useQueryClient()
  const [product, setProduct] = useState({
    name: "",
    categoryId: "",
    image: "",
    price: "",
    description:"",
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProduct({
      ...product,
      [name]: value
    })
  }
  const postProduct = async () => {
    try {
      const res = await api.post("/products", product)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
//   const handleReset = async () =>
//   {
// setProduct({
//   name: "",
//   categoryId: "",
//   image: "",
//   price: "",
//   description:"",
// })
//   }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await postProduct()
    queryClient.invalidateQueries({ queryKey: ["products"] })
}
  const deleteProduct = async (productId: string) => {
    try {
      const res = await api.delete(`/products/${productId}`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }}
    const handleDeleteProduct = async (productId: string) => {
      await deleteProduct(productId)
      queryClient.invalidateQueries({ queryKey: ["products"] })
    }
  const getProducts = async () => {
    try {
      const res = await api.get("/products")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const {
    isPending,
    data: products,
  } = useQuery<Product[]>({
    queryKey: ["Products"],
    queryFn: getProducts
  })
  if (isPending) {
    return <p>Data is fetching.....</p>
  }


return (
  <>
    {/* <Select title="product" name="products">
        <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a product" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem>
                <SelectLabel>Products</SelectLabel>
                {data?.map((product) => {
                    return <SelectItem key={product.id} value="apple" onChange={onChange}>{product.name}</SelectItem>;
                })}
            </SelectItem>
        </SelectContent>
    </Select> */}
    <form className="mt-20 w-1/3 mx-auto" onSubmit={handleSubmit}>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Add new product</h3>
      <Input name="name" className="mt-4" type="text" placeholder="Name" onChange={handleChange} />
      <Input
        name="categoryId"
        className="mt-4"
        type="text"
        placeholder="Category"
        onChange={handleChange}
      />
      <div className="flex justify-between">
        <Button className="mt-4" type="reset" variant="secondary">
          Reset
        </Button>
        <Button className="mt-4" type="submit" variant="secondary">
          Submit
        </Button>
      </div>
    </form>
    <div>
      <h1>Product</h1>
      <Table>
          <TableCaption>A list of your recent products</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]"></TableHead>
              <TableHead className="text-center">Name</TableHead>
              <TableHead className="text-center">CategoryId</TableHead>
              <TableHead className="text-center">Image</TableHead>
              <TableHead className="text-center">Price</TableHead>
              <TableHead className="text-center"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium"></TableCell>
                <TableCell className="text-center">{product.name}</TableCell>
                <TableCell className="text-center">{product.categoryId}</TableCell>
                <TableCell className="text-center">{product.image}</TableCell>
                <TableCell className="text-center">{product.price}</TableCell>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <div className="flex gap-4  p-4">
                      <Button variant="destructive" className="mt-auto h-auto">
                        X
                      </Button>
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to delete? {product.name}?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                      This action cannot be undone. Deleting your product will permanently remove all associated data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDeleteProduct (product.id)}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <TableCell />
                <TableCell className="text-left">
                  <EditDialog product={product} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
  </>
)
}