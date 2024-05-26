// import React, { useState, useEffect, useContext } from "react"
// import { useQueryClient } from "@tanstack/react-query"

// import api from "@/api"
// import { Input } from "../components/ui/input"
// import { Button } from "../components/ui/button"
// import { Context } from "@/App"

// const ProfilePage = () => {
//   const context = useContext(Context)
//   const { state, handelUserUpdateSubmit } = context

//   const queryClient = useQueryClient()
//   const [user, setUser] = useState({
//     firstName: "",
//     lastName: ""
//   })
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setUser((prevState) => ({ ...prevState, [name]: value }))
    
//   }
//   const handelUserUpdateSubmit = async () => {
//     const newUserInfo = await updateUser(user)
//     const updatedUserInfo = {
//       ...state.userInfo,
//       firstName: newUserInfo.firstName,
//       lastName: newUserInfo.lastName,
//       phone: newUserInfo.phone
//     }

//     localStorage("userInfo", updatedUserInfo)
//     dispatch({
//       type: "updateUser",
//       payload: updatedUserInfo
//     })
//   }
//   const updateUser = async (user: any) => {
//     try {
//       const res = await api.put(`/users/${state.user.id}`, user, {
//         headers: { Authorization: `Bearer ${state.userInfo.token}` }
//       })
//       return res.data
//     } catch (error) {
//       console.error(error)
//       return Promise.reject(new Error("Something went wrong"))
//     }
//   }

//   return (
//     <div className="profile-page">
//       <h1>Profile</h1>
//       <div className="profile-form">
//         <label>
//           First Name:
//           <Input name="firstName" value={user.firstName} onChange={handleInputChange} />
//         </label>
//         <label>
//           Last Name:
//           <Input name="lastName" value={user.lastName} onChange={handleInputChange} />
//         </label>
//         <Button>Edit</Button>
//       </div>
//     </div>
//   )
// }

// export default ProfilePage




import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
// import { Link } from "react-router-dom"
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
export function Profile() {
  return (
    <>
    <NavBar/>
      <div className="flex flex-col items-center justify-center gap-6 px-4 py-12 md:px-6 lg:flex-row lg:gap-12">
        <div className="flex flex-col items-center gap-4">
          <Avatar className="h-24 w-24 border-4 border-gray-100 dark:border-gray-800">
            <AvatarImage alt="User Avatar" src="/placeholder-user.jpg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="text-center lg:text-left">
            <h1 className="text-2xl font-bold">John Doe</h1>
            <p className="text-gray-500 dark:text-gray-400">Plant enthusiast and nature lover</p>
          </div>
        </div>
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <p>
            Hi, I am John, and I am passionate about all things plants! From succulents to tropical
            foliage, I love learning about the unique characteristics and care requirements of
            different plant species. My goal is to create a lush, thriving indoor oasis and share my
            knowledge with others.
          </p>
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
                <Input id="name" placeholder="Enter your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Enter your email" type="email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" placeholder="Enter your password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea className="min-h-[100px]" id="bio" placeholder="Enter your bio" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">Save</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Manage your notification preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="email-notifications" />
                <Label htmlFor="email-notifications">Email Notifications</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="push-notifications" />
                <Label htmlFor="push-notifications">Push Notifications</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="sms-notifications" />
                <Label htmlFor="sms-notifications">SMS Notifications</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">Save</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Manage your account security settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="two-factor-auth">Two-Factor Authentication</Label>
                <div className="flex items-center space-x-2">
                  <Switch id="two-factor-auth" />
                  <span className="text-gray-500 dark:text-gray-400">
                    Enhance your account security
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-history">Login History</Label>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline">
                    View History
                  </Button>
                  <span className="text-gray-500 dark:text-gray-400">
                    See your recent login activity
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="delete-account">Delete Account</Label>
                <div className="flex items-center space-x-2">
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
      </div>
    </>
  )
}
