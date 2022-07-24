import React, { memo } from 'react';

const TodoItem = memo(({ todo, onIncrement, onDecrement, onDelete }) => {
  const handleIncrement = () => {
    onIncrement(todo);
  };

  const handleDecrement = () => {
    onDecrement(todo);
  };

  const handleDelete = () => {
    onDelete(todo);
  };

  return (
    <li className="todo">
      <span className="todo-name">{todo.name}</span>
      <span className="todo-count">{todo.count}</span>
      <button className="todo-button todo-increase" onClick={handleIncrement}>
        <i className="fas fa-plus-square"></i>
      </button>
      <button className="todo-button todo-decrease" onClick={handleDecrement}>
        <i className="fas fa-minus-square"></i>
      </button>
      <button className="todo-button todo-delete" onClick={handleDelete}>
        <i className="fas fa-trash"></i>
      </button>
    </li>
  );
});

export default TodoItem;
