import axios from "axios";
import React, { useState } from "react";
import { baseURL } from "../App";

const CreateTodo = ({ getALLTodosFromBackend }) => {
  const [newTodo, setNewTodo] = useState({
    name: "",
    description: "",
  });

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
  return (
    <div className="container d-flex justify-content-center align-items-center ">
      <div id="createTodo" className="w-50">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            id="name"
            className="form-control"
            onChange={(e) => setNewTodo({ ...newTodo, name: e.target.value })}
            value={newTodo.name}
          ></input>
        </div>
        <div>
          <label htmlFor="decription" className="form-label">
            Description:
          </label>
          <input
            type="text"
            id="description"
            className="form-control"
            onChange={(e) =>
              setNewTodo({ ...newTodo, description: e.target.value })
            }
            value={newTodo.description}
          ></input>
        </div>
        <div className="d-flex justify-content-center m-4">
          <button
            id="createbutton"
            onClick={createTodo}
            className="btn btn-primary"
          >
            create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTodo;
