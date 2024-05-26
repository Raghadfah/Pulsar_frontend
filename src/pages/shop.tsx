import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

export function Shop (){
    return (
        <>
 <DropdownMenu>
            <DropdownMenuTrigger asChild>
              
            <Link to='/'>Shop</Link>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/profile">Settings</Link>
              </DropdownMenuItem>
              { 
              }
            </DropdownMenuContent>
          </DropdownMenu>





        </>
    )
}