
import {Link} from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MenuIcon, MountainIcon, SearchIcon, ShoppingCartIcon } from "lucide-react"
import { Cart } from "./cart"

export function NavBar() {
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
        </nav>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Input
              className="pr-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
              placeholder="Search..."
              type="search"
            />
            <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
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

