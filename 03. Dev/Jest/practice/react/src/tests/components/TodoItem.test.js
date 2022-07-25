import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoItem from '../../components/TodoItem';

describe('TodoItem', () => {
  const todo = { name: 'javascript', count: 1, id: 1 };

  let TodoItemComp;
  let handleIncrement;
  let handleDecrement;
  let handleDelete;

  beforeEach(() => {
    handleIncrement = jest.fn();
    handleDecrement = jest.fn();
    handleDelete = jest.fn();

    TodoItemComp = (
      <TodoItem
        todo={todo}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onDelete={handleDelete}
      />
    );
  });

  test('snapshot', () => {
    const component = render(TodoItemComp);
    expect(component.container).toMatchSnapshot();
  });

  describe('Button click', () => {
    beforeEach(() => {
      render(TodoItemComp);
    });

    test('calls handleIncrement', () => {
      const button = screen.getByTitle('increase');
      userEvent.click(button);
      expect(handleIncrement).toHaveBeenCalledWith(todo);
    });

    test('calls handleDecrement', () => {
      const button = screen.getByTitle('decrease');
      userEvent.click(button);
      expect(handleDecrement).toHaveBeenCalledWith(todo);
    });

    test('calls handleDelete', () => {
      const button = screen.getByTitle('delete');
      userEvent.click(button);
      expect(handleDelete).toHaveBeenCalledWith(todo);
    });
  });
});
