import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

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
          <div key={index}>
            <input
              type="checkbox"
              id={todo._id}
              onChange={(e) => updateTodo(e, todo)}
              checked={todo.isDone}
            ></input>
            <label htmlFor={todo._id}>
              <span>
                <p>{todo.name}</p>
              </span>
              <span>
                <p>{todo.description}</p>
              </span>
              <button onClick={(e) => deleteTodo(e, todo)}>delete</button>
            </label>
          </div>
        ))}
      </div>
      <div id="createTodo">
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            onChange={(e) => setNewTodo({ ...newTodo, name: e.target.value })}
            value={newTodo.name}
          ></input>
        </div>
        <div>
          <label htmlFor="decription">Description:</label>
          <input
            type="text"
            id="description"
            onChange={(e) =>
              setNewTodo({ ...newTodo, description: e.target.value })
            }
            value={newTodo.description}
          ></input>
        </div>

        <button id="createbutton" onClick={createTodo}>
          create
        </button>
      </div>
    </>
  );
}

export default App;
