import React, { useEffect, useState } from 'react'
import MyDialog from './MyDialog'
import MyInput from './MyInput'
import MyButton from './MyButton'
import { useAddUpdateTodo } from '@/hooks/useAddUpdateTodo'

interface AddTaskProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  isEdit?: boolean
  prevTitle?: string
  prevDescription?: string
  _id?: string
}

const AddTask: React.FC<AddTaskProps> = ({
  isOpen,
  setIsOpen,
  isEdit = false,
  prevTitle = "",
  prevDescription = "",
  _id = "",
}) => {  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [titleError, setTitleError] = useState("");

  const {createTodo, loading, updateTodoFunc} = useAddUpdateTodo();

  const handleButtonClick = async():Promise<void> => {
    if(!title) {
      setTitleError("Title is required");
      return;
    }
    setTitleError("");
    if(isEdit) await updateTodoFunc(_id, {title, description});
    else await createTodo(title, description);
    setIsOpen(false);
  }

  const onModalClose = ():void => {
    if(isEdit) {
      setTitle(prevTitle);
      setDescription(prevDescription);
      return
    }
    setTitle("");
    setDescription("");
  }

  useEffect(() => {
    if(isEdit) {
      setTitle(prevTitle);
      setDescription(prevDescription);
    }
  }, [isEdit, prevTitle, prevDescription])
  
  return (
    <MyDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      dissmissable={!loading}
      header={isEdit ? "Edit Your Task" : "Add Your Task"}
      footer={
        <MyButton
          title={isEdit ? "Edit Task" : "Add Task"}
          onClick={handleButtonClick}
          className="w-[30%]"
          btnClassName="bg-primary-1 hover:bg-primary-3 dark:bg-mixed-1 dark:hover:bg-mixed-2"
          loading={loading}
        />
      }
      onDismiss={onModalClose}
    >
      <MyInput
        label='Title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={loading}
        error={titleError}
        placeholder='Enter title'
      /> 

      <MyInput
        label='Description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={loading}
        placeholder='Enter description'
      />
    </MyDialog>
  )
}

export default AddTask