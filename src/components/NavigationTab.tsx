import React from "react"

interface NavigationTabProps {
  icon: React.ReactNode
  label?: string
  onClick?: () => void
  isActive?: boolean
}

const NavigationTab:React.FC<NavigationTabProps> = ({
  icon,
  label,
  onClick = () => {},
  isActive = false
}) => {
  return (
    <div 
      className={`${isActive ? "bg-[#5f5f5f91]" : "bg-transparent"} min-w-[70px] h-[70px] flex flex-col justify-center items-center rounded-lg cursor-pointer mx-2 md:my-2 md:mx-0 hover:bg-[#8d8d8d91] transition duration-300`}
      onClick={onClick}
    >
      {icon}
      <p className={`text-sm ${isActive ? "text-[#fff] font-bold" : "text-[#000]"} text-center mt-1 dark:text-[#f5f5f5]`}>{label}</p>
    </div>
  )
}

export default NavigationTab