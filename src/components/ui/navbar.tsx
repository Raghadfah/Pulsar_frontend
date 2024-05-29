import { Link, useSearchParams } from "react-router-dom"
import {
  ChevronDownIcon,
  HardHatIcon,
  LogOutIcon,
  MenuIcon,
  SearchIcon,
  TelescopeIcon
} from "lucide-react"
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
      {/* <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 dark:hover:bg-gray-800 dark:focus-visible:ring-gray-300">
        <span>Shop</span>
        <ChevronDownIcon className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56 bg-white shadow-lg rounded-md dark:bg-gray-950">
        <DropdownMenuItem className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">
          <TelescopeIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <span>Telescope</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">
          <HardHatIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <span>Space Helmet</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu> */}

      <DropdownMenu>
        <DropdownMenuTrigger className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 dark:hover:bg-gray-800 dark:focus-visible:ring-gray-300">
          <span>Shop</span>
          <ChevronDownIcon className="h-4 w-4" />
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className="w-56  bg-white shadow-lg rounded-md dark:bg-gray-950"
        >
          {categories?.map((cat) => {
            return (
              <Link key={cat.id} to={`/products/section/${cat.id}`}>
                <DropdownMenuItem>{cat.name}</DropdownMenuItem>
              </Link>
            )
          })}
          <DropdownMenuItem className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">
            <TelescopeIcon className="h-5 w-5 text-gray-500 dark:text-gray-400 dark:hover:bg-gray-800" />
            <span style={{ color: "black" }}> Solar Telescope</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">
            <TelescopeIcon className="h-5 w-5 text-gray-500 dark:text-gray-400 dark:hover:bg-gray-800" />
            <span style={{ color: "black" }}> Refractor Telescope</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">
            <HardHatIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <span style={{ color: "black" }}>Space Helmet</span>
          </DropdownMenuItem>
        </DropdownMenuContent>

        {/* <DropdownMenuContent align="end">
          <DropdownMenuSeparator />
          {categories?.map((cat) => {
            return (
              <Link key={cat.id} to={`/products/section/${cat.id}`}>
                <DropdownMenuItem>{cat.name}</DropdownMenuItem>
              </Link>
            )
          })}
        </DropdownMenuContent> */}
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
                <TelescopeIcon className="rounded-full" h-6 text-white />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link to="/profile">
                <DropdownMenuItem>Settings</DropdownMenuItem>
              </Link>
              <Link to="/aboutUs">
                <DropdownMenuItem>Support</DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <LogOutIcon>
                  <Link to="\" onClick={handleLogout}>
                    Logout
                  </Link>
                </LogOutIcon>
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
