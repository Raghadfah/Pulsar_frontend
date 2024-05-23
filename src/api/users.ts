import { User } from "@/types"
import api from "."

export default {
    getAll: async () => {
      try {
        const res = await api.get("/products")
        return res.data
      } catch (error) {
        console.error(error)
        return Promise.reject(new Error("Something went wrong"))
      }
    },
    createOne: async (user: User) => {
      try {
        const res = await api.post("/users", user)
        return res.data
      } catch (error) {
        console.error(error)
        return Promise.reject(new Error("Something went wrong"))
      }
    },
    deleteOne: async (id: string) => {
      try {
        const res = await api.delete(`/users/${id}`)
        return res.data
      } catch (error) {
        console.error(error)
        return Promise.reject(new Error("Something went wrong"))
      }
    }
  }