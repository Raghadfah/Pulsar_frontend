import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

import CategoryService from "@/api/categories"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Category } from "@/types"
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
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import { EditCategoryDialog } from "./editCategoryDialog"

export function DashboardCategory (){
    const queryClient = useQueryClient()

    const [category, setCategory] = useState({
      name: "",
      description: "",
    })
    const postCategory = async () => {
        try {
          const res = await api.post("/categories", category)
          return res.data
        } catch (error) {
          console.error(error)
          return Promise.reject(new Error("Something went wrong"))
        }
      }
  
    const handleDeleteCategory = async (categoryId: string) => {
      const hasConfirmed = confirm("Do you really want to delete?")
      hasConfirmed && (await CategoryService.deleteOne(categoryId))
      queryClient.invalidateQueries({ queryKey: ["categories"] })
    }
    const getCategories = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await api.get("/categories", {
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
    const { data: categories, error: categoryError } = useQuery<Category[]>({
      queryKey: ["categories"],
      queryFn: getCategories
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setCategory({
          ...category,
          [name]: value
        })
      }
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await postCategory()
    await handleReset()
    queryClient.invalidateQueries({ queryKey: ["categories"] })
  }
  const handleReset = async () => {
    setCategory({
      name: "",
      description: ""
    })
  }
    return (
      <>
<form className="w-1/2 mx-auto" onSubmit={handleSubmit}>
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Add new category
        </h2>
        <Input
          name="name"
          className="mt-5"
          type="text"
          placeholder="Name"
          onChange={handleChange}
          value={category.name}
        />
        <Input
          name="description"
          className="mt-5"
          type="text"
          placeholder="Description"
          onChange={handleChange}
          value={category.description}
        />
        <div className="flex justify-evenly">
          <Button className="mt-5 mx-1 w-2/3 bg-pink-900" type="submit">
            Add
          </Button>
          <Button className="mt-5 mx-1 w-2/3 bg-pink-900" type="reset">
            Reset
          </Button>
        </div>
      </form>
        <Table>
          <TableCaption>A list of your recent category</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]"></TableHead>
              <TableHead className="text-center">Name</TableHead>
              <TableHead className="text-center">description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories?.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium"></TableCell>
                <TableCell className="text-center">{category.name}</TableCell>
                <TableCell className="text-center">{category.description}</TableCell>
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
                        Are you sure you want to delete? {category.name}?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. Deleting your category will permanently remove all
                        associated data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDeleteCategory(category.id)}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <TableCell />
                <TableCell className="text-left">
                  <EditCategoryDialog category={category} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    )
  }
