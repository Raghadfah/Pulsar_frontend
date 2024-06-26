import {  useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"

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
import { Button } from "@/components/ui/button"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,  AlertDialogFooter, AlertDialogHeader,  AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import UserService from "@/api/users"
import { EditUserDialog } from "./editUserDialog"



export function DashboardUsers() {
  const queryClient = useQueryClient()

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    phone: 0,
    role: ""
  })

  const handleDeleteUser = async (userId: string) => {
    const hasConfirmed = confirm("Do you really want to delete?")
    hasConfirmed && (await UserService.deleteOne(userId))
    queryClient.invalidateQueries({ queryKey: ["users"] })
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
  const { data: users, error: userError } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers
  })
  return (
    <>
        <h2 className="font-bold text-[#ffe6b4] text-2xl mb-2">Users</h2>
      <Table>
        <TableCaption>A list of your recent user</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]"></TableHead>
            <TableHead className="text-center">Full Name</TableHead>
            <TableHead className="text-center">Email</TableHead>
            <TableHead className="text-center">Phone</TableHead>
            <TableHead className="text-center">Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user) => (
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
                      This action cannot be undone. Deleting your user will permanently remove all
                      associated data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDeleteUser(user.id)}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <TableCell />
              <TableCell className="text-left">
                <EditUserDialog user={user} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}