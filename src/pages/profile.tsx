import { ChangeEvent, useContext, useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { AvatarFallback, Avatar } from "@/components/ui/avatar"

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { NavBar } from "@/components/ui/navbar"
import api from "@/api"
import { Address, User } from "@/types"
import { Context } from "@/App"
import { Separator } from "@/components/ui/separator"
import { Footer } from "@/components/ui/footer"

export function Profile() {
  const context = useContext(Context)
  if (!context) throw Error("context is missing ")
  const { state } = context

  const queryClient = useQueryClient()

  const [updatedUser, setUpdatedUser] = useState({
    id: "",
    email: "",
    fullName: "",
    phone: "",
    role: "Customer"
  })

  const findUser = async () => {
    try {
      const res = await api.get(`/users/${state.user?.nameidentifier}`)
      setUpdatedUser(res.data)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const { data: user } = useQuery<User>({
    queryKey: ["users"],
    queryFn: findUser
  })
  const handleUserChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setUpdatedUser({ ...updatedUser, [name]: value })
  }

  const patchUser = async () => {
    try {
      const res = await api.patch(`/users/${state.user?.nameidentifier}`, updatedUser)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const handleUpdateUser = async () => {
    await patchUser()
    queryClient.invalidateQueries({ queryKey: ["users"] })
  }

  const [address, setAddress] = useState({
    country: "",
    city: "",
    street: "",
    zip_code: 0
  })

  const postAddress = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await api.post("/addresses", address, {
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
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAddress({ ...address, [name]: value })
  }
  const handleReset = async () => {
    setAddress({
      country: "",
      city: "",
      street: "",
      zip_code: 0
    })
  }
  const handleAddressSubmit = async () => {
    await postAddress()
    await handleReset()
    queryClient.invalidateQueries({ queryKey: ["addresses"] })
  }

  const getAddressesById = async (id: string | undefined) => {
    try {
      const res = await api.get(`/addresses/user/${id}`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const { data: addresses } = useQuery<Address[]>({
    queryKey: ["products", user?.id],
    queryFn: () => getAddressesById(user?.id)
  })

  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center justify-center gap-6 px-4 py-12 md:px-6 lg:flex-row lg:gap-12">
        <div className="flex flex-col items-center gap-4">
          <Avatar className="h-24 w-24 border-4 border-gray-100 dark:border-gray-800">
            <img
              alt="Sofia Davis"
              className="h-30 w-30 rounded-full object-cover"
              height="120"
              src="images/profile.png"
              style={{
                aspectRatio: "120/120",
                objectFit: "cover"
              }}
              width="120"
            />
            <AvatarFallback>{user?.fullName}</AvatarFallback>
          </Avatar>
          <div className="text-center lg:text-left">
            <h1 className="text-2xl font-bold">{user?.fullName}</h1>
            <p className="text-gray-500 dark:text-gray-400">Space enthusiast and cosmic explorer</p>
          </div>
        </div>
      </div>
      <div className="container mx-auto grid gap-12 px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Update your profile information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="fullName"
                  defaultValue={user?.fullName}
                  placeholder="Enter your name"
                  onChange={handleUserChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  defaultValue={user?.email}
                  placeholder="Enter your email"
                  type="email"
                  onChange={handleUserChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  disabled
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  type="password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  defaultValue={user?.phone}
                  placeholder="Enter your phone number"
                  type="text"
                  onChange={handleUserChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea className="min-h-[100px]" id="bio" placeholder="Enter your bio" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto" onClick={handleUpdateUser}>
                Save
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Address</CardTitle>
              <CardDescription>Add address information to your account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  defaultValue={address.country}
                  onChange={handleAddressChange}
                  id="country"
                  name="country"
                  type="text"
                  placeholder="Enter your country"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  defaultValue={address.city}
                  onChange={handleAddressChange}
                  id="city"
                  name="city"
                  placeholder="Enter your city"
                  type="text"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="street">Street</Label>
                <Input
                  defaultValue={address.street}
                  onChange={handleAddressChange}
                  id="street"
                  name="street"
                  placeholder="Enter your street"
                  type="text"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zip_code">Zip-code</Label>
                <Input
                  defaultValue={address.zip_code}
                  onChange={handleAddressChange}
                  id="zip_code"
                  name="zip_code"
                  placeholder="Enter your zip_code"
                  type="number"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto" onClick={handleAddressSubmit}>
                Add
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Manage your account security settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 ">
                <Label htmlFor="two-factor-auth">Two-Factor Authentication</Label>
                <div className="flex flex-col gap-4 items-center space-x-2">
                  <span className="text-gray-500 dark:text-gray-400">
                    Enhance your account security
                  </span>
                  <Switch id="two-factor-auth" />
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="login-history">Login History</Label>
                <div className="flex flex-col items-center gap-4 space-x-2">
                  <span className="text-gray-500 dark:text-gray-400">
                    See your recent login activity
                  </span>
                  <Button size="sm" variant="outline">
                    View History
                  </Button>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="delete-account">Delete Account</Label>
                <div className="flex flex-col gap-4 items-center space-x-2">
                  <Button size="sm" variant="destructive">
                    Delete Account
                  </Button>
                  <span className="text-gray-500 dark:text-gray-400">
                    This action cannot be undone
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Separator />
        <h1 className="text-2xl text-start font-bold">Saved Addresses</h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {addresses?.map((address) => {
            return (
              <Card key={address.id}>
                <CardHeader>
                  <CardTitle className="text-start">Address</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-start">
                  <div className="space-y-2">
                    <Label htmlFor="country">Country : {address.country}</Label>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City : {address.city}</Label>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="street">Street: {address.street}</Label>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip_code">Zip-code: {address.zip_code}</Label>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
      <Footer />
    </>
  )
}
