import React from 'react';
import TodoItem from './TodoItem';
import AddForm from './AddForm';

const TodoList = ({
  todos,
  onIncrement,
  onDecrement,
  onDelete,
  onAdd,
  onReset,
}) => {
  return (
    <>
      <AddForm onAdd={onAdd} />
      <ul className="todos">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            onDelete={onDelete}
          />
        ))}
      </ul>
      <button className="todos-reset" onClick={onReset}>
        Reset All
      </button>
    </>
  );
};

export default TodoList;
