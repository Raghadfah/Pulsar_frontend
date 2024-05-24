import { DashboardCategory } from "@/components/ui/dashboardCategory"
import { DashboardProduct } from "@/components/ui/dashboardProduct"
import { DashboardUsers } from "@/components/ui/dashboardUsers"

export function Dashboard() {
  return (
    <>
    <DashboardProduct/>
      <DashboardUsers/>
      <DashboardCategory/>
    </>
  )
}
