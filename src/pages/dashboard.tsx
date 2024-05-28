import { DashboardCategory } from "@/components/ui/dashboardCategory"
import { DashboardOrders } from "@/components/ui/dashboardOrders"
import { DashboardProduct } from "@/components/ui/dashboardProduct"
import { DashboardUsers } from "@/components/ui/dashboardUsers"
import { NavBar } from "@/components/ui/navbar"


export function Dashboard() {
  return (
    <>
      <NavBar />
      <DashboardProduct />
      <DashboardUsers />
      <DashboardCategory />
      <DashboardOrders />
    </>
  )
}
