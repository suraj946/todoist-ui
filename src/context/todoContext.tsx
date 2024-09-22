import { Todo } from "@/types";
import React, {createContext, useContext, useState, ReactNode} from "react";

interface TodoContextType{
  todos: Todo[]
  allTodos: Todo[]
  setAllTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  addTodo: (todo: Todo) => void
  deleteTodo: (id: string) => void
  updateTodo: (todo: Todo) => void
}

const TodoContext = createContext<TodoContextType | null>(null);

export const useTodo = () => {
  const todo = useContext(TodoContext);
  if(!todo) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return todo;
}

export const TodoProvider = ({children}: {children: ReactNode}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const addTodo = (todo: Todo) => {
    setTodos([...todos, todo]);
  }
  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo._id !== id));
  }
  const updateTodo = (todo: Todo) => {
    setTodos(todos.map((t) => t._id === todo._id ? todo : t));
  }
  return (
    <TodoContext.Provider value={{allTodos, setAllTodos, todos, setTodos, addTodo, deleteTodo, updateTodo}}>
      {children}
    </TodoContext.Provider>
  );
}