import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import TodoCard from "./components/TodoCard";
import CreateTodo from "./components/CreateTodo";

const baseURL = "http://localhost:3000";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    getALLTodosFromBackend();
  }, []);

  //read call
  const getALLTodosFromBackend = async () => {
    const allTodos = await axios.get(`${baseURL}/todos`);
    setTodoList(allTodos.data);
  };
  //create call
  const createTodo = async () => {
    const result = await axios.post(`${baseURL}/newtodo`, newTodo);
    if (result.status === 200) {
      setNewTodo({
        name: "",
        description: "",
      });
      getALLTodosFromBackend();
    }
  };
  //update call
  const updateTodo = async (e, todo) => {
    //send the id and the value to be updated of property/properties to backend
    const result = await axios.post(`${baseURL}/update`, {
      id: todo._id,
      isDone: !todo.isDone,
    });
    //fetch the new rocords and render
    if (result) {
      getALLTodosFromBackend();
    }
  };

  //delete call
  const deleteTodo = async (e, todo) => {
    const result = await axios.post(`${baseURL}/delete`, {
      id: todo._id,
    });
    if (result) {
      getALLTodosFromBackend();
    }
  };

  return (
    <>
      <div>
        {todoList?.map((todo, index) => (
          <TodoCard
            index={index}
            todo={todo}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        ))}
      </div>
      <CreateTodo
        newTodo={newTodo}
        createTodo={createTodo}
        setNewTodo={setNewTodo}
      />
    </>
  );
}

export default App;
