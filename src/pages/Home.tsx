import AddTask from "@/components/AddTask"
import Loader from "@/components/Loader"
import Search from "@/components/Search"
import TodoList from "@/components/TodoList"
import { Button } from "@/components/ui/button"
import { useTodo } from "@/context/todoContext"
import { useToast } from "@/hooks/use-toast"
import MainLayout from "@/layouts/MainLayout"
import { TodoResponse } from "@/types"
import instance from "@/utils/axiosInstance"
import { getToastStyle } from "@/utils/utility"
import { AxiosError } from "axios"
import { useEffect, useState } from "react"

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const {setTodos, todos, setAllTodos} = useTodo();
  const {toast} = useToast();
  const getAllTodos = async():Promise<void> => {
    try {
      setLoading(true);
      const {data} = await instance.get<TodoResponse>("/todo/all");
      if(data.success){
        setTodos(data.data);
        setAllTodos(data.data);
      }
    } catch (error) {
      if(error instanceof AxiosError && error.response) {
        toast({
          title: error.response.data.message,
          className: getToastStyle("error")
        });
      }
    }finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    (async () => {
      if(todos.length) return;
      await getAllTodos();
    })();
  }, [])
  
  return (
    <MainLayout>
      <AddTask isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="w-full md:w-[80%] m-auto mt-10 flex flex-col items-center">
        <Search />
        <div className="w-[90%] lg:w-[58%] flex items-center justify-between px-3">
          <p className="text-4xl font-bold uppercase">Your tasks</p>
          <Button onClick={() => setIsOpen(true)} className="bg-primary-1">Add Task</Button>
        </div>
        {
          loading ? <Loader className="h-[40vh]" label="Fetching your todos..." /> : <TodoList />
        }
      </div>
    </MainLayout>
  )
}

export default Home