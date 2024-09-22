import React from 'react'
import { Button } from './ui/button'
import Loader from './Loader'

interface BtnProps {
  title: string
  onClick: () => void
  disabled?: boolean
  className?: string
  loading?: boolean
  btnClassName?: string
}
const MyButton: React.FC<BtnProps> = ({
  title,
  onClick,
  disabled,
  className = "w-full",
  loading,
  btnClassName
}) => {
  return (
    <div className={`relative ${className}`}>
      <Button
        className={`bg-primary-1 hover:bg-primary-3 text-xl w-[100%] transition duration-500 mt-3 dark:bg-dark-3 ${btnClassName}`}
        size={"lg"}
        onClick={onClick}
        disabled={disabled || loading}

      >{loading ? "" : title}</Button>
      {loading && <Loader className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]' />}
    </div>
  )
}

export default MyButton