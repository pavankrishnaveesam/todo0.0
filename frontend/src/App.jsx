import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import TodoCard from "./components/TodoCard";
import CreateTodo from "./components/CreateTodo";

export const baseURL = "http://localhost:3000";

function App() {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    getALLTodosFromBackend();
  }, []);

  //read call
  const getALLTodosFromBackend = async () => {
    const allTodos = await axios.get(`${baseURL}/todos`);
    setTodoList(allTodos.data);
  };

  return (
    <>
      <div className="d-flex flex-wrap p-2 justify-content-center">
        {todoList?.map((todo, index) => (
          <TodoCard
            key={index}
            todo={todo}
            getALLTodosFromBackend={getALLTodosFromBackend}
          />
        ))}
      </div>
      <CreateTodo getALLTodosFromBackend={getALLTodosFromBackend} />
    </>
  );
}

export default App;
