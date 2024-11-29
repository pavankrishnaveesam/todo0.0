import React from "react";

const TodoCard = ({ index, todo, updateTodo, deleteTodo }) => {
  return (
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
  );
};

export default TodoCard;
