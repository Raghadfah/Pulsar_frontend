
import {Link, useSearchParams} from "react-router-dom"
import { MenuIcon, SearchIcon } from "lucide-react"
import { ChangeEvent, FormEvent, useContext, useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Product, ROLE } from "@/types"
import api from "@/api"
import { Cart } from "./cart"
import { Context } from "@/App"

export function NavBar() {
  const context = useContext(Context)
  if (!context) throw Error("Context is missing")
  const { state, handleRemoveUser } = context

  const queryClient = useQueryClient()
  const [searchParams, setSearchParams] = useSearchParams()
  const defaultSearch = searchParams.get("searchBy") || ""
  const [searchBy, setSearchBy] = useState(defaultSearch)

  const getProducts = async () => {
    try {
      const res = await api.get(`/products?searchBy=${searchBy}`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts
  })
  const handleLogout = () => {
    if (typeof window !== undefined) {
      window.location.reload()
    }

    localStorage.removeItem("token")
    localStorage.removeItem("user")

    handleRemoveUser()
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchBy(value)
  }
  const handleSearch = async (e: FormEvent) => {
    e.preventDefault()
    setSearchParams({ ...searchParams, searchBy: searchBy })
    queryClient.invalidateQueries({ queryKey: ["products"] })
  }
  return (
    <header className="flex items-center justify-between px-4 py-3 shadow-sm dark:bg-[#f8d7da]">
      <Link className="flex items-center gap-2" to="#">
        <span className="text-lg font-semibold">Pulsar</span>
      </Link>
      <div className="relative flex items-center gap-4">
        <nav className="hidden md:flex items-center gap-6">
          <Link className="text-sm font-medium hover:underline" to="#">
            Home
          </Link>
          <Link className="text-sm font-medium hover:underline" to="#">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline" to="#">
            Contact
          </Link>
          {state.user?.role === ROLE.Admin && (
              <Link to="/dashboard">Dashboard</Link>
          )}
          {!state.user && (
              <Link to="/signup"> SignUp </Link>
          )}
          {!state.user && (
              <Link to="/login">Login</Link>
          )}
          {state.user && (
            <Link to="\" onClick={handleLogout}>
              Logout
            </Link>
          )}
        </nav>
        <div className="flex items-center gap-4">
          <form  onSubmit={handleSearch} >
          <div className="relative">
            <Input value={searchBy} name="searchBy" onChange={handleChange}
              className="pr-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
              placeholder="Search..."
              type="search"
            />
            <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div></form>
          <Cart/>
        </div>
      </div>
      <Button className="md:hidden" size="icon" variant="outline">
        <MenuIcon className="h-6 w-6" />
        <span className="sr-only">Toggle navigation</span>
      </Button>
    </header>
  )
}

