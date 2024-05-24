import api from "@/api"
import { Category } from "@/types"
import { Dialog, DialogContent, DialogDescription, DialogTitle,DialogTrigger } from "@radix-ui/react-dialog"
import { useQueryClient } from "@tanstack/react-query"
import { ChangeEvent, useState } from "react"
import { Button } from "./button"
import { DialogFooter, DialogHeader } from "./dialog"
import { Label } from "@radix-ui/react-label"
import { Input } from "./input"

export function EditCategoryDialog ({ category }: { category: Category }) {
    const queryClient = useQueryClient()
    const [updatedCategory, setUpdatedCategory] = useState(category)
  
    const updateCategory = async () => {
      try {
        const res = await api.patch(`/categories/${updatedCategory.id}`, updatedCategory)
        return res.data
      } catch (error) {
        console.error(error)
        return Promise.reject(new Error("Something went wrong"))
      }
    }
  
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target
  
      setUpdatedCategory({
        ...updatedCategory,
        name: value,
      })
    }
  
    const handleUpdate = async () => {
      await updateCategory()
      queryClient.invalidateQueries({ queryKey: ["categories"] })
    }
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Category</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
            Edit your category here. Click save to apply changes.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                defaultValue={updatedCategory.name}
                className="col-span-3"
                onChange={handleChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleUpdate}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }