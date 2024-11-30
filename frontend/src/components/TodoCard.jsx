import axios from "axios";
import React from "react";
import { baseURL } from "../App";

const TodoCard = ({ todo, getALLTodosFromBackend }) => {
  //update call
  const updateTodo = async () => {
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
  const deleteTodo = async () => {
    const result = await axios.post(`${baseURL}/delete`, {
      id: todo._id,
    });
    if (result) {
      getALLTodosFromBackend();
    }
  };

  return (
    <div>
      <input
        type="checkbox"
        id={todo._id}
        onChange={updateTodo}
        checked={todo.isDone}
      ></input>
      <label htmlFor={todo._id}>
        <span>
          <p>{todo.name}</p>
        </span>
        <span>
          <p>{todo.description}</p>
        </span>
        <button onClick={deleteTodo}>delete</button>
      </label>
    </div>
  );
};

export default TodoCard;
