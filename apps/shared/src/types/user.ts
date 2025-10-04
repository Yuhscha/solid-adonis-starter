export type User = {
  id: number
  email: string
  name: string
  createdAt: Date
  updatedAt: Date
}

export type CreateUserRequest = {
  email: string
  name: string
  password: string
}

export type UpdateUserRequest = {
  name?: string
  email?: string
}

export type LoginRequest = {
  email: string
  password: string
}

export type AuthResponse = {
  user: User
  token?: string
}
