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
    <div className="d-flex col-sm-5 col-12 card m-2">
      <div className="px-4 py-2 d-flex align-items-center justify-content-between">
        <input
          type="checkbox"
          id={todo._id}
          onChange={updateTodo}
          checked={todo.isDone}
          className="checkbox-large"
        ></input>
        <button className="btn btn-outline-primary btn-sm" onClick={deleteTodo}>
          delete
        </button>
      </div>
      <div className="card-body">
        <label htmlFor={todo._id}>
          <h5
            className={`card-title ${
              todo.isDone ? "text-decoration-line-through" : ""
            }`}
          >
            {todo.name}
          </h5>

          <p
            className={`card-text ${
              todo.isDone ? "text-decoration-line-through" : ""
            }`}
          >
            {todo.description}
          </p>
          <p class="card-text">
            <small class="text-muted">Last updated 3 mins ago</small>
          </p>
        </label>
      </div>
    </div>
  );
};

export default TodoCard;
