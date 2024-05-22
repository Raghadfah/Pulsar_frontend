export type Product = {
  id: string
  name: string
  categoryId: string
  description: string
  quantity: number
  image: string
  price: number
}
export type Category = {
  id: string
  name: string
  description: string
}

export type User = {
  id: string
  fullName: string
  phone: number
  email: string
  role: string
}

export const ROLE = {
  Admin: "Admin",
  Customer: "Customer"
} as const

export type DecodedUser = {
  aud: string
  emailaddress: string
  exp: number
  iss: string
  name: string
  nameidentifier: string
  role: keyof typeof ROLE
}