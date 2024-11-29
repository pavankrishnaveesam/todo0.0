import React from "react";

const CreateTodo = ({ newTodo, setNewTodo, createTodo }) => {
  return (
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
  );
};

export default CreateTodo;
