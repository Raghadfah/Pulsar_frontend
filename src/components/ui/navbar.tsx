import { Link, useSearchParams } from "react-router-dom"
import { MenuIcon, SearchIcon } from "lucide-react"
import { ChangeEvent, FormEvent, useContext, useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import CategoryService from "@/api/categories"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Category, Product, ROLE } from "@/types"
import api from "@/api"
import { Cart } from "./cart"
import { Context } from "@/App"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "./dropdown-menu"

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
    if (searchBy) {
      setSearchParams({ ...searchParams, searchBy: searchBy })
    } else {
      setSearchParams({ ...searchParams })
    }

    queryClient.invalidateQueries({ queryKey: ["products"] })
  }

  const getCategories = async () => {
    try {
      const res = await api.get("/categories")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const { data: categories } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategories
  })

  return (
    <header className="flex items-center justify-between px-4 py-3 shadow-sm dark:bg-[#f8d7da]">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <span>Shop</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuSeparator />
          {categories?.map((cat) => {
            return (
              <Link key={cat.id} to={`/products/section/${cat.id}`}>
                <DropdownMenuItem>{cat.name}</DropdownMenuItem>
              </Link>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="relative flex items-center gap-4">
        <nav className="hidden md:flex items-center gap-6">
          <Link className="text-sm font-medium hover:underline" to="/">
            Home
          </Link>
          <Link className="text-sm font-medium hover:underline" to="/aboutUs">
            About Us
          </Link>
          {state.user?.role === ROLE.Admin && <Link to="/dashboard">Dashboard</Link>}
          {!state.user && <Link to="/signup"> SignUp </Link>}
          {!state.user && <Link to="/login">Login</Link>}
        </nav>
        {state.user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
                size="icon"
                variant="ghost"
              >
                <img
                  alt="Avatar"
                  className="rounded-full"
                  height="32"
                  src="https://img.freepik.com/premium-vector/avatar-profile-vector-illustrations-website-social-networks-user-profile-icon_495897-224.jpg"
                  style={{
                    aspectRatio: "32/32",
                    objectFit: "cover"
                  }}
                  width="32"
                />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link to="/profile">
                <DropdownMenuItem>Settings</DropdownMenuItem>
              </Link>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <Link to="\" onClick={handleLogout}>
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Input
                value={searchBy}
                name="searchBy"
                onChange={handleChange}
                // className="pr-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                placeholder="Search..."
                type="search"
              />
              <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </form>
          <Cart />
        </div>
      </div>
      <Button className="md:hidden" size="icon" variant="outline">
        <MenuIcon className="h-6 w-6" />
        <span className="sr-only">Toggle navigation</span>
      </Button>
    </header>
  )
}
/**
 * Ask Yazan for the logout issus
 */
