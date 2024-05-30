import { Link, useNavigate } from "react-router-dom"
import { ChangeEvent, FormEvent, useState } from "react"

import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import api from "../api"
import { NavBar } from "@/components/ui/navbar"
import { Footer } from "@/components/ui/footer"

export function Signup() {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: null
  })

  const handleSignup = async () => {
    try {
      const res = await api.post(`/users/signup`, user)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, valueAsNumber } = e.target

    setUser({
      ...user,
      [name]: name === "phone" ? valueAsNumber : value
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const response = await handleSignup()
    if (response) {
      navigate("/login")
    }
  }

  return (
    <div>
      <NavBar />
      <h3>Sign Up</h3>
      <p className="text-gray-500 dark:text-gray-400">Create your account to get started.</p>
      <form action="POST" onSubmit={handleSubmit} className="w-full md:w-1/3 mx-auto">
        <Input
          name="fullName"
          className="mt-4"
          type="text"
          placeholder="Fullname"
          onChange={handleChange}
        />
        <Input
          name="email"
          className="mt-4"
          type="text"
          placeholder="Email"
          onChange={handleChange}
        />
        <Input
          name="password"
          type="password"
          className="mt-4"
          placeholder="Password"
          onChange={handleChange}
        />
        <Input
          name="phone"
          className="mt-4"
          type="number"
          placeholder="Phone number"
          onChange={handleChange}
        />
        <div className="flex justify-between flex-col">
          <Button className="mt-4">Signup</Button>
          <Button variant="link" className="mt-4">
            <Link   className="text-pink-500"  to="/login">Have an account already?</Link>
          </Button>
        </div>
      </form>
      <Footer />
    </div>
  )
}
