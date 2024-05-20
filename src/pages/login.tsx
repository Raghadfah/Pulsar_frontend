import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


import api from "@/api";



export function Login(){
  const navigate = useNavigate()
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
        localStorage.setItem("token", token)
        navigate("/")
      }
    }
    return (
      <div>
        <h3>LOGIN</h3>
        <form action="POST" className="w-full md:w-1/3 mx-auto" onSubmit={handleSubmit}>
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
          <div className="flex justify-between flex-col">
            <Button className="mt-4">Login</Button>
            <Button variant="link" className="mt-4">
              <Link to="/signup">Create an account</Link>
            </Button>
          </div>
        </form>
      </div>
    )
  }