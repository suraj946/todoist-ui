import React, { useState } from 'react';
import {MoonIcon, SunIcon} from "lucide-react"
interface ContainerProps {
  children: React.ReactNode;
}
const LoginSignup:React.FC<ContainerProps> = ({
  children
}) => {
  const [darkMode, setDarkMode] = useState<boolean>(false)
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
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-primary-6 dark:bg-mixed-1'>
      <div className="absolute top-5 right-5">
        {darkMode ? 
          <SunIcon onClick={toggleDarkMode} className='cursor-pointer'/> : 
          <MoonIcon onClick={toggleDarkMode} className='cursor-pointer' />
        }
      </div>
      <div className="flex flex-col rounded-2xl shadow-2xl bg-secondary w-screen h-screen items-center lg:w-[30%] lg:h-[90%] md:w-[60%] md:h-[90%] dark:bg-dark-1">
        {children}
      </div>
    </div>
  )
}

export default LoginSignup