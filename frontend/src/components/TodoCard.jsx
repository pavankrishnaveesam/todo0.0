import axios from "axios";
import React from "react";
import { baseURL } from "../App";
import {
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";

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

  const lastUpdatedTime = () => {
    const backendDate = todo.lastUpdated;
    if (backendDate) {
      const givenDate = new Date(backendDate);
      const currentDate = new Date();

      const years = differenceInYears(currentDate, givenDate);
      const months = differenceInMonths(currentDate, givenDate) % 12; // Remaining months
      const days = differenceInDays(currentDate, givenDate) % 30; // Remaining days
      const hours = differenceInHours(currentDate, givenDate) % 24; // Remaining hours
      const minutes = differenceInMinutes(currentDate, givenDate) % 60; // Remaining minutes
      const seconds = differenceInSeconds(currentDate, givenDate) % 60; // Remaining seconds

      if (years > 0) {
        return `${years} year${years > 1 ? "s" : ""}`;
      } else if (months > 0) {
        return `${months} month${months > 1 ? "s" : ""}`;
      } else if (days > 0) {
        return `${days} day${days > 1 ? "s" : ""}`;
      } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? "s" : ""}`;
      } else if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? "s" : ""}`;
      } else {
        return `${seconds} second${seconds > 1 ? "s" : ""}`;
      }
    }
    return "unknown time";
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
            <small class="text-muted">{`Last updated ${lastUpdatedTime()} ago`}</small>
          </p>
        </label>
      </div>
    </div>
  );
};

export default TodoCard;
