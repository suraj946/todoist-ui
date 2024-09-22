export type todoType = {
  _id: string
  prevTitle: string
  prevDescription: string
}

export interface User{
  name: string;
  email: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginSignupResponse {
  message: string,
  statusCode: number,
  success: boolean
  data: User
}

export interface ResponseWithoutData {
  message: string,
  statusCode: number,
  success: boolean
}

export interface Todo{
  _id: string
  title: string
  description: string
  status: string
}

export interface TodoResponse {
  message: string,
  statusCode: number,
  success: boolean
  data: Todo[]
}

export interface SingleTodoResponse {
  message: string,
  statusCode: number,
  success: boolean
  data: Todo
}