import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import "./App.css";
import CreateTodo from "./components/CreateTodo";
import AllTodos from "./components/AllTodos";

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
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <AllTodos
                todoList={todoList}
                getALLTodosFromBackend={getALLTodosFromBackend}
              />
            }
          />
          <Route
            path="/createtodo"
            element={
              <CreateTodo getALLTodosFromBackend={getALLTodosFromBackend} />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
