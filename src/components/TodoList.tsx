import { useState } from "react"
import TodoItem from "./TodoItem"
import AddTask from "./AddTask";
import { todoType } from "@/types";
import { useTodo } from "@/context/todoContext";
import { useAddUpdateTodo } from "@/hooks/useAddUpdateTodo";

const TodoList = () => {
  const [disabled, setDisabled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [prevData, setPrevData] = useState<todoType>({ prevTitle: "", prevDescription: "", _id: "" });

  const { todos } = useTodo();
  const {updateTodoFunc, deleteTodoFunc} = useAddUpdateTodo();

  const handleEdit = (prevTodo: todoType) => {
    setPrevData(prevTodo);
    setIsOpen(true);
  }
  const handleDelete = async(_id: string, setLoading:React.Dispatch<React.SetStateAction<boolean>>):Promise<void> => {
    setLoading(true);
    setDisabled(true);
    await deleteTodoFunc(_id);
    setLoading(false);
    setDisabled(false);
  }
  const handleToggleComplete = async(_id: string, status: string, setLoading:React.Dispatch<React.SetStateAction<boolean>>):Promise<void> => {
    setLoading(true);
    setDisabled(true);
    await updateTodoFunc(_id, {status});
    setLoading(false);
    setDisabled(false);
  }
  return (
    <div className='max-h-[65vh] w-[90%] lg:w-[60%] mt-2 px-2 lg:max-h-[70vh] overflow-auto rounded-sm scroll-smooth'>
      <AddTask
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isEdit={true}
        prevTitle={prevData.prevTitle}
        prevDescription={prevData.prevDescription}
        _id={prevData._id}
      />
      {
        todos.length > 0 ? todos.map((todo) => {
          return <TodoItem
            key={todo._id}
            _id={todo._id}
            title={todo.title}
            description={todo.description}
            status={todo.status}
            disabled={disabled}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleToggleComplete={handleToggleComplete}
          />
        }) : <p className="text-4xl font-bold text-dark-4 dark:text-foreground text-center mt-16">No tasks added yet</p>
      }
    </div>
  )
}

export default TodoList