import React, { useState } from 'react'
import { Badge } from './ui/badge'
import { TrashIcon, PencilIcon, } from 'lucide-react'
import Loader from './Loader'
import { todoType } from '@/types'

interface TodoItemProps {
  _id: string
  title: string
  description: string
  status: string
  disabled?: boolean
  handleDelete: (_id: string, setLoading:React.Dispatch<React.SetStateAction<boolean>>) => void
  handleEdit: (prevData: todoType) => void
  handleToggleComplete: (_id: string, status: string, setLoading:React.Dispatch<React.SetStateAction<boolean>>) => void
}
const TodoItem: React.FC<TodoItemProps> = ({
  _id,
  title,
  description,
  status,
  disabled,
  handleDelete,
  handleEdit,
  handleToggleComplete
}) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="mx-auto shadow-lg rounded-lg overflow-hidden my-4 p-2 bg-primary-5 dark:bg-mixed-1 relative">
      <div className="px-6 py-2">
        <div className="font-bold text-2xl mb-2">{title}</div>
        <p className="text-gray-700 text-lg dark:text-[#e4e4e4]">{description}</p>
        <Badge className={`text-dark-1 absolute right-0 top-0 capitalize text-sm ${status === "pending" ? "bg-warning" : "bg-success"}`}>{status}</Badge>
      </div>
      <div className="px-6 pt-2 flex justify-end items-center">
        {
          loading ? <Loader className='my-2' /> : <>
            <p onClick={disabled ? () => {} : () => handleToggleComplete(_id, status==="pending" ? "completed" : "pending", setLoading)} className={`font-bold ${disabled ? "text-gray-500" : "text-dark-1 dark:text-foreground hover:text-blue-700 dark:hover:text-blue-700 cursor-pointer"}`}>{status === "pending" ? "Mark As Completed" : "Mark As Pending"}</p>
            <PencilIcon className={`w-6 h-6 ml-5 ${disabled ? "text-gray-500" : "text-dark-1 dark:text-foreground cursor-pointer hover:text-blue-700 dark:hover:text-blue-700 "}`} 
              onClick={disabled ? () => {} : () => handleEdit({prevTitle: title, prevDescription: description, _id})}
            />
            <TrashIcon className={`w-6 h-6 ml-5 ${disabled ? "text-gray-500" : "text-danger cursor-pointer hover:text-red-700 dark:hover:text-red-700"} `} 
              onClick={disabled ? () => {} : () => handleDelete(_id, setLoading)}
            />
          </>
        }
      </div>
    </div>
  )
}

export default TodoItem