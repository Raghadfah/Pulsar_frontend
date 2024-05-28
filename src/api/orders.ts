import api from "@/api"
import { Order } from "@/types"

export default {
  getAll: async () => {
    try {
      const res = await api.get("/orders")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  },
  createOne: async (order: Order) => {
    try {
      const res = await api.post("/orders", order)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  },
  deleteOne: async (id: string) => {
    try {
      const res = await api.delete(`/orders/${id}`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
}