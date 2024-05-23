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
import { User } from "@/types"
import { useQuery } from "@tanstack/react-query"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle,
    AlertDialogTrigger
  } from "@radix-ui/react-alert-dialog"
  import { Button } from "@/components/ui/button"
  import { Input } from "@/components/ui/input"
import { EditDialog } from "./editDialog"
import { AlertDialogFooter, AlertDialogHeader } from "./alert-dialog"

//??missing functionality
export function ManageUsers() {
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
      const { data, error } = useQuery<User[]>({
        queryKey: ["users"],
        queryFn: getUsers
      })

      return(
        <>
        <Table>
          <TableCaption>A list of your recent products</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]"></TableHead>
              <TableHead className="text-center">Full Name</TableHead>
              <TableHead className="text-center">Email</TableHead>
              <TableHead className="text-center">Phone</TableHead>
              <TableHead className="text-center">Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {data?.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium"></TableCell>
                <TableCell className="text-center">{user.fullName}</TableCell>
                <TableCell className="text-center">{user.email}</TableCell>
                <TableCell className="text-center">{user.phone}</TableCell>
                <TableCell className="text-center">{user.role}</TableCell>
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
                        Are you sure you want to delete? {user.fullName}?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. Deleting your product will permanently remove
                        all associated data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      {/* <AlertDialogAction onClick={() => handleDeleteProduct(user.fullName)}>
                        Continue
                      </AlertDialogAction> */}
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <TableCell />
                <TableCell className="text-left">
                  {/* <EditDialog user={user} /> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </>
      )
}