import { Link, useNavigate } from "react-router-dom"
import jwt from "jwt-decode"
import { ChangeEvent, FormEvent, useContext, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import api from "@/api"
import { Context } from "@/App"
import { reshapeUser } from "@/lib/utils"
import { NavBar } from "@/components/ui/navbar"
import { Footer } from "@/components/ui/footer"

export function Login() {
  const navigate = useNavigate()
  const context = useContext(Context)
  if (!context) throw Error("Context is missing")
  const { handleStoreUser } = context

  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  const handleLogin = async () => {
    try {
      const res = await api.post(`/users/login`, user)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target

    setUser({
      ...user,
      [name]: value
    })
  }
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const token = await handleLogin()
    if (token) {
      const decodedToken = jwt(token)
      const user = reshapeUser(decodedToken)
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))

      handleStoreUser(user)
      navigate("/")
    }
  }
  return (
    <div>
      <NavBar />
      <h2 className="text-2xl font-bold">Welcome back!</h2>
      <p className="text-gray-500 dark:text-gray-400">Sign in to your account to continue.</p>
      <form action="POST" className="w-full md:w-1/3 mx-auto" onSubmit={handleSubmit}>
        <Input
          name="email"
          className="mt-4"
          type="text"
          placeholder="Email"
          onChange={handleChange}
        />
        <Link className="text-sm font-medium text-pink-500 hover:underline" to="/profile"></Link>
        <Input
          name="password"
          type="password"
          className="mt-4"
          placeholder="Password"
          onChange={handleChange}
        />
        Forgot password?
        <div className="flex justify-between flex-col">
          <Button className="mt-4">Login</Button>
          <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            Do not have an account?
            <Link className="font-medium text-pink-500 " to="/signup">
              Sign up
            </Link>
          </div>
        </div>
      </form>
      <Footer />
    </div>
  )
}
