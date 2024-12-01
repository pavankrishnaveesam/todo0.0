import axios from "axios";
import React, { useState } from "react";
import { baseURL } from "../App";
import { useNavigate } from "react-router-dom";

const CreateTodo = ({ getALLTodosFromBackend }) => {
  const [newTodo, setNewTodo] = useState({
    name: "",
    description: "",
  });
  const navigate = useNavigate();

  //create call
  const createTodo = async () => {
    const result = await axios.post(`${baseURL}/newtodo`, newTodo);
    if (result.status === 200) {
      setNewTodo({
        name: "",
        description: "",
      });
      getALLTodosFromBackend();
      navigate("/");
    }
  };
  return (
    <div className="container d-flex justify-content-center align-items-center mt-5">
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
          <textarea
            rows="10"
            id="description"
            className="form-control"
            onChange={(e) =>
              setNewTodo({ ...newTodo, description: e.target.value })
            }
            value={newTodo.description}
          ></textarea>
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
