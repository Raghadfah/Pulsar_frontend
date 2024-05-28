import React, { useState } from "react"
import api from "@/api"
import { Button } from "./button"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import OrderService from "@/api/orders"

type Order = {
  id: string
  customerName: string
  total: number
  status: string
  createdAt: string
  items: Array<{
    productId: string
    quantity: number
  }>
}

export function DashboardOrders() {
    const queryClient = useQueryClient()
  const [order, setOrders] = useState({
    addressId:"",
    items:"",
    quantity:"",
    productId:"",
  })
 
    const getOrders = async () => {
        try {
          // const token = localStorage.getItem("token")
          const res = await api.get("/orders")
          return res.data
        } catch (error) {
          console.error(error)
          return Promise.reject(new Error("Something went wrong"))
        }
      }
      const { data: orders, error: orderError } = useQuery<Order[]>({
        queryKey: ["orders"],
        queryFn: getOrders
      })


  const handleDeleteOrder = async (orderId: string) => {
    const hasConfirmed = confirm("Do you really want to delete?")
    hasConfirmed && (await OrderService.deleteOne(orderId))
    queryClient.invalidateQueries({ queryKey: ["orders"] })
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setOrders({
      ...order,
      [name]: value
    })
  }
 



  return (
    <div className="admin-orders ">
      <h2>Orders</h2>
      <table className="orders-table ">
        <thead > 
          <tr >
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customerName}</td>
              <td>${order.total}</td>
              <td>{order.status}</td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td>
                <Button onClick={() => handleDeleteOrder(order.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

