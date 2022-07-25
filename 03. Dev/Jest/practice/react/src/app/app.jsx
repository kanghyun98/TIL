import React, { useCallback, useState } from 'react';
import './app.css';
import Navbar from '../components/Navbar';
import TodoList from '../components/TodoList';

const App = ({ presenter }) => {
  const [todos, setTodos] = useState(presenter.getTodos());

  const handleIncrement = useCallback(
    (todo) => {
      presenter.increment(todo, setTodos);
    },
    [presenter]
  );

  const handleDecrement = useCallback(
    (todo) => {
      presenter.decrement(todo, setTodos);
    },
    [presenter]
  );

  const handleDelete = useCallback(
    (todo) => {
      presenter.delete(todo, setTodos);
    },
    [presenter]
  );

  const handleAdd = useCallback(
    (name) => {
      presenter.add(name, setTodos);
    },
    [presenter]
  );

  const handleReset = useCallback(() => {
    presenter.reset(setTodos);
  }, [presenter]);

  return (
    <>
      <Navbar totalCount={todos.filter((item) => item.count > 0).length} />
      <TodoList
        todos={todos}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onDelete={handleDelete}
        onAdd={handleAdd}
        onReset={handleReset}
      />
    </>
  );
};

export default App;
