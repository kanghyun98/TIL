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
      <span className="todo-name" data-testid="todo-name">
        {todo.name}
      </span>
      <span className="todo-count" data-testid="todo-count">
        {todo.count}
      </span>
      <button
        className="todo-button todo-increase"
        title="increase"
        onClick={handleIncrement}
      >
        <i className="fas fa-plus-square"></i>
      </button>
      <button
        className="todo-button todo-decrease"
        title="decrease"
        onClick={handleDecrement}
      >
        <i className="fas fa-minus-square"></i>
      </button>
      <button
        className="todo-button todo-delete"
        title="delete"
        onClick={handleDelete}
      >
        <i className="fas fa-trash"></i>
      </button>
    </li>
  );
});

export default TodoItem;
