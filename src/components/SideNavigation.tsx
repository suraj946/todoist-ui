import React, { useState } from "react";
import NavigationTab from "./NavigationTab";
import { useNavigate } from "react-router-dom";
import { LayoutListIcon, LogOutIcon, CircleUser } from "lucide-react";
import {MoonIcon, SunIcon} from "lucide-react"
import { useLogout } from "@/hooks/useLogout";

const SideNavigation:React.FC = () => {
  const [tab, setTab] = useState(window.location.pathname);
  const [darkMode, setDarkMode] = useState<boolean>(false)

  const {logout} = useLogout();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    const list = document.documentElement.classList;
    if(darkMode) {
      list.remove('dark')
      list.add('light')
    }
    else{
      list.add('dark')
      list.remove('light')
    }
  }
  const navigate = useNavigate();
  const getColor = (path:string):string => {
    return path === tab ? "text-[#f5f5f5] dark:text-[#f5f5f5]" : "text-[#000] dark:text-[#f5f5f5]"
  }
  const handleNavigation = (tab:string) => {
    setTab(tab);
    navigate(tab);
  }
  const handleLogout = async() => {
    await logout();
  }
  return (
    <div className="flex items-center justify-between w-screen h-[90px] fixed bottom-0 md:top-0 md:left-0 md:flex-col md:w-[90px] bg-primary-1 pl-12 pr-12 md:h-screen md:pt-12 md:pb-12 dark:bg-mixed-1">
      <h1 className="hidden md:block text-xl font-bold">TODOIST</h1>
      <div className="flex justify-between items-center w-screen md:flex-col md:w-[unset]">
        <NavigationTab 
          label="Todos" 
          icon={<LayoutListIcon className={getColor("/")} />} 
          isActive={tab === "/"}
          onClick={() => handleNavigation("/")}
        />
        <NavigationTab 
          label="Profile" 
          icon={<CircleUser className={getColor("/profile")} />} 
          isActive={tab === "/profile"}
          onClick={() => handleNavigation("/profile")}
        />
        <NavigationTab 
          icon={darkMode ? 
            <SunIcon onClick={toggleDarkMode} className='cursor-pointer'/> : 
            <MoonIcon onClick={toggleDarkMode} className='cursor-pointer' />
          }
          onClick={toggleDarkMode}
        />
      </div>
      <div className="hidden md:block">
        <NavigationTab 
          label="Logout" 
          icon={<LogOutIcon className="text-[#000] dark:text-[#f5f5f5]" />} 
          onClick={handleLogout}
        />
      </div>
    </div>
  )
}

export default SideNavigation