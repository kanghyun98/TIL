import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from '../../components/TodoList';

describe('TodoList', () => {
  const todos = [
    { name: 'javascript', count: 1, id: 1 },
    { name: 'typescript', count: 4, id: 2 },
  ];

  let TodoListComp;
  let onIncrement;
  let onDecrement;
  let onDelete;
  let onAdd;
  let onReset;

  beforeEach(() => {
    onIncrement = jest.fn();
    onDecrement = jest.fn();
    onDelete = jest.fn();
    onAdd = jest.fn();
    onReset = jest.fn();

    TodoListComp = (
      <TodoList
        todos={todos}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onDelete={onDelete}
        onAdd={onAdd}
        onReset={onReset}
      />
    );
  });

  test('snapshot', () => {
    const component = render(TodoListComp);
    expect(component.container).toMatchSnapshot();
  });

  describe('Button click', () => {
    beforeEach(() => {
      render(TodoListComp);
    });

    test('calls onIncrement', () => {
      const button = screen.getAllByTitle('increase')[0];
      userEvent.click(button);
      expect(onIncrement).toHaveBeenCalledWith(todos[0]);
    });

    test('calls onDecrement', () => {
      const button = screen.getAllByTitle('decrease')[0];
      userEvent.click(button);
      expect(onDecrement).toHaveBeenCalledWith(todos[0]);
    });

    test('calls onDelete', () => {
      const button = screen.getAllByTitle('delete')[0];
      userEvent.click(button);
      expect(onDelete).toHaveBeenCalledWith(todos[0]);
    });

    test('calls onReset', () => {
      const button = screen.getByText('Reset All');
      userEvent.click(button);
      expect(onReset).toHaveBeenCalledTimes(1);
    });
  });
});
