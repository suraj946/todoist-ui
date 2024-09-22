import { useEffect, useState } from "react";
import MyInput from "./MyInput";
import { SearchIcon } from "lucide-react";
import { useTodo } from "@/context/todoContext";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const {allTodos, setTodos} = useTodo();  

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if(!searchQuery) {
        setTodos(allTodos);
      } else {
        const filteredTodos = allTodos.filter((todo) => todo.title.toLowerCase().includes(searchQuery.toLowerCase()));
        setTodos(filteredTodos);
      }
    }, 500);
    return () => clearTimeout(timeOut);
  }, [searchQuery, allTodos, setTodos]);
  
  return (
    <div className="w-[90%] lg:w-[60%] p-5 relative">
      <MyInput
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search your tasks"
        inputClassName="rounded-full px-5 pr-16"
      />
      <SearchIcon className="absolute right-8 top-10 -translate-y-1/2 text-dark-1 dark:text-foreground" />
    </div>
  )
}

export default Search