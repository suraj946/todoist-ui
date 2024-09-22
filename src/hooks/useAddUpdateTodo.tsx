import { useState } from "react"
import { useToast } from "./use-toast";
import { getToastStyle } from "@/utils/utility";
import instance from "@/utils/axiosInstance";
import { ResponseWithoutData, SingleTodoResponse } from "@/types";
import { useTodo } from "@/context/todoContext";
import { AxiosError } from "axios";

interface useAddUpdateTodoType {
  createTodo: (title: string, description?: string) => Promise<void>;
  updateTodoFunc: (id: string, body: {title?: string, description?: string, status?: string}) => Promise<void>;
  loading: boolean;
  deleteTodoFunc: (_id: string) => Promise<void>;
}

export const useAddUpdateTodo = ():useAddUpdateTodoType => {
  const [loading, setLoading] = useState(false);
  const {toast} = useToast();
  const {addTodo, updateTodo, deleteTodo} = useTodo();
  const createTodo = async(title: string, description?: string):Promise<void> => {
    if(!navigator.onLine){
      toast({
        title: 'Connection Error',
        className: getToastStyle("error")
      });
      return;
    }
    try {
      setLoading(true);
      const {data} = await instance.post<SingleTodoResponse>("/todo/create", { title, description });
      if(data.success){
        addTodo(data.data);
        toast({
          title: data.message,
          className: getToastStyle("success")
        });
      }
    } catch (error) {
      if(error instanceof AxiosError && error.response) {
        toast({
          title: error.response.data.message,
          className: getToastStyle("error")
        });
      }
    } finally {
      setLoading(false);
    }
  }


  const updateTodoFunc = async(_id : string, body: {title?: string, description?: string, status?: string}):Promise<void> => {
    if(!navigator.onLine){
      toast({
        title: 'Connection Error',
        className: getToastStyle("error")
      });
      return;
    }
    try {
      setLoading(true);
      const {data} = await instance.put<SingleTodoResponse>(`/todo/single/${_id}`, body);
      if(data.success){
        updateTodo(data.data);
        toast({
          title: data.message,
          className: getToastStyle("success")
        });
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
  const deleteTodoFunc = async(_id: string):Promise<void> => {
    if(!navigator.onLine){
      toast({
        title: 'Connection Error',
        className: getToastStyle("error")
      });
      return;
    }
    try {
      setLoading(true);
      const {data} = await instance.delete<ResponseWithoutData>(`/todo/single/${_id}`);
      if(data.success){
        deleteTodo(_id);
        toast({
          title: data.message,
          className: getToastStyle("success")
        });
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
  return {
    createTodo, updateTodoFunc, loading, deleteTodoFunc
  }
}