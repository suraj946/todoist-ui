import { useUser } from "@/context/userContext";
import { ResponseWithoutData } from "@/types";
import instance from "@/utils/axiosInstance";
import { useState } from "react";
import { useToast } from "./use-toast";
import { getToastStyle } from "@/utils/utility";
import { AxiosError } from "axios";
import { useTodo } from "@/context/todoContext";

interface UseLogoutReturn {
  logout: () => Promise<void>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
}

export const useLogout = ():UseLogoutReturn => {
  const {setUser} = useUser();
  const {setTodos, setAllTodos} = useTodo();
  const [loading, setLoading] = useState(false);
  const {toast} = useToast()
  const logout = async():Promise<void> => {
    try {
      setLoading(true);
      const {data} = await instance.get<ResponseWithoutData>("/user/logout");
      if(data.success){
        setUser(null);
        setTodos([]);
        setAllTodos([]);
        toast({
          title:data.message,
          className: getToastStyle("success")
        })
      }
    } catch (error) {
      if(error instanceof AxiosError && error.response) {
        toast({
          title: error.response.data.message,
          className: getToastStyle("error")
        });
      }
    }
  }
  return {
    logout, setLoading, loading
  };  
}