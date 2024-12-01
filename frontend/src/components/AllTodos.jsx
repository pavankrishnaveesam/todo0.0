import React from "react";
import TodoCard from "./TodoCard";
import { useNavigate } from "react-router-dom";

const AllTodos = ({ todoList, getALLTodosFromBackend }) => {
  const navigate = useNavigate();
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
      <div className="d-flex justify-content-center mt-3">
        <button
          className="btn btn-primary"
          onClick={() => navigate("/createtodo")}
        >
          Create A new TODO
        </button>
      </div>
    </>
  );
};

export default AllTodos;
