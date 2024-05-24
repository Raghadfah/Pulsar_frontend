import { useQuery, useQueryClient } from "@tanstack/react-query"
import { ChangeEvent, useState } from "react"

import CategoryService from "@/api/categories"
import ProductService from "@/api/products"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Category, Product, User } from "@/types"
import api from "@/api"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@radix-ui/react-alert-dialog"
import { AlertDialogFooter, AlertDialogHeader } from "@/components/ui/alert-dialog"
import { EditDialog } from "@/components/ui/editDialog"
import { ManageUsers } from "@/components/ui/manageUsers"

export function Dashboard() {
  const queryClient = useQueryClient()
  const [product, setProduct] = useState({
    name: "",
    id:"",
    quantity:0,
    categoryId: "",
    image: "",
    price: 0,
    description: ""
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProduct({
      ...product,
      [name]: value
    })
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await ProductService.createOne(product)
    queryClient.invalidateQueries({ queryKey: ["products"] })
  }
  const handleDeleteProduct = async (productId: string) => {
    const hasConfirmed = confirm("Do you really want to delete?")
    hasConfirmed && (await ProductService.deleteOne(productId))
    queryClient.invalidateQueries({ queryKey: ["products"] })
  }
  const getUsers = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await api.get("/users", {
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
  const { data: products, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: ProductService.getAll
  })
  const { data: categories, error: catError } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: CategoryService.getAll
  })
  const { data: users, error: userError } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers
  })

  const productWithCat = products?.map((product) => {
    const category = categories?.find((cat) => cat.id === product.categoryId)

    if (category) {
      return {
        ...product,
        categoryId: category.name
      }
    }
    return product
  })
  
  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setProduct({
      ...product,
      categoryId: e.target.value
    })
  }
  return (
    <>
      <form className="mt-20 w-1/3 mx-auto" onSubmit={handleSubmit}>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Add new product</h3>
        <select name="cats" onChange={handleSelect}>
          {categories?.map((cat) => {
            return (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            )
          })}
        </select>
        <Input
          name="name"
          className="mt-4"
          type="text"
          placeholder="Name"
          onChange={handleChange}
        />
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
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {productWithCat?.map((product) => (
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
                        This action cannot be undone. Deleting your product will permanently remove
                        all associated data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDeleteProduct(product.id)}> 
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
      <ManageUsers/>
    </>
  )
}
