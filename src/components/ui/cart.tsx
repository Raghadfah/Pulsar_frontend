import { useContext } from "react"
import { Button } from "./button"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Context } from "@/App"
import { MenuIcon, ShoppingCartIcon } from "lucide-react"
import { Link } from "react-router-dom"
import { Badge } from "./badge"


export function Cart() {
    const context = useContext(Context)
  if (!context) throw Error("Context is missing")
  const { state } = context
  return (
    <Popover>
      <PopoverTrigger asChild>
      
      <Link className="relative" to="#">
            <ShoppingCartIcon className="h-6 w-6" />
            <Badge className="absolute -top-2 -right-2 rounded-full bg-red-500 px-2 py-1 text-xs text-white">{state.cart.length}</Badge>
          </Link>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div>{state.cart.map(product => {
            return (
               <div key={product.id}>
                <img src={product.image} alt={product.name} className="w-10 h-10 object-contain"></img>
                <h4>{product.name}</h4>
                <span>{product.price}</span>
               </div>
            )
    })}</div>
      </PopoverContent>
    </Popover>
  )
}
