import EditProfile from "@/components/EditProfile"
import MyButton from "@/components/MyButton"
import { useTodo } from "@/context/todoContext";
import { useUser } from "@/context/userContext";
import { useToast } from "@/hooks/use-toast";
import { useLogout } from "@/hooks/useLogout";
import MainLayout from "@/layouts/MainLayout"
import { ResponseWithoutData } from "@/types";
import instance from "@/utils/axiosInstance";
import { getToastStyle } from "@/utils/utility";
import { AxiosError } from "axios";
import { useState } from "react";

const Profile = () => { 
  const [isOpen, setIsOpen] = useState(false);
  const {user, setUser} = useUser();
  const {logout, loading: logoutLoading} = useLogout();
  const [loading, setLoading] = useState(false);
  const {toast} = useToast();
  const {setAllTodos, setTodos} = useTodo();
  const handleLogout = async():Promise<void> => {
    await logout();
  }
  const handleDelete = async():Promise<void> => {
    if(!navigator.onLine){
      toast({
        title: 'Connection Error',
        className: getToastStyle("error")
      });
      return;
    }
    if(!confirm("Are you sure you want to delete your account?")) return;
    try {
      setLoading(true);
      const {data} = await instance.delete<ResponseWithoutData>("/user/single");
      if(data.success){
        toast({
          title:data.message,
          className: getToastStyle("success")
        })
        setUser(null);
        setTodos([]);
        setAllTodos([]);
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
  return (
    <MainLayout>
      <EditProfile isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex justify-center">
        <div className="w-[90%] lg:w-[60%] lg:h-[90%] bg-primary-5 dark:bg-mixed-1 mt-10 p-5 rounded-md flex flex-col items-center">
          <p className="text-2xl font-bold">{user?.name}</p>
          <p className="text-lg">{user?.email}</p>
          <div className="w-full flex justify-evenly mt-2">
            <MyButton
              title="Edit Profile"
              onClick={() => setIsOpen(true)}
              className="w-[30%]"
              btnClassName="dark:bg-primary-1"
              disabled={loading}
            /> 
            <MyButton
              title="Logout"
              onClick={handleLogout}
              className="w-[30%]"
              btnClassName="dark:bg-primary-1"
              loading={logoutLoading}
              disabled={loading}
            />
          </div>
          <MyButton
            title="Delete Account"
            onClick={handleDelete}
            className="w-[30%] mt-2"
            btnClassName="bg-destructive hover:bg-destructive/90 dark:bg-destructive dark:hover:bg-destructive/90"
            loading={loading}
          />
        </div>
      </div>
    </MainLayout>
  )
}

export default Profile