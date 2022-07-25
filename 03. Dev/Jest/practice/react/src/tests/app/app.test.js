import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../app/app';
import TodoPresenter from '../../logics/todo_presenter';

describe('App', () => {
  const todos = [
    { id: 1, name: 'JavaScript', count: 0 },
    { id: 2, name: 'TypeScript', count: 0 },
    { id: 3, name: 'React', count: 3 },
  ];

  let AppComp;
  let presenter;

  beforeEach(() => {
    presenter = new TodoPresenter(todos);
    AppComp = <App presenter={presenter} />;
  });

  test('snapshot', () => {
    const component = render(AppComp);

    expect(component.container).toMatchSnapshot();
  });

  describe('Component', () => {
    beforeEach(() => {
      render(AppComp);
    });

    test('counts only active todos', () => {
      const button = screen.getAllByTitle('increase')[0];
      userEvent.click(button);

      const count = screen.getByTestId('total-count');
      expect(count.innerHTML).toBe('2');
    });

    test('adds new todo', () => {
      const inputComp = screen.getByPlaceholderText('Todo');
      const buttonComp = screen.getByText('Add');

      const newTodo = 'new todo';
      userEvent.type(inputComp, newTodo);
      userEvent.click(buttonComp);

      const addedName = screen.getAllByTestId('todo-name')[3];
      const addedCount = screen.getAllByTestId('todo-count')[3];

      expect(addedName.innerHTML).toBe(newTodo);
      expect(addedCount.innerHTML).toBe('0');
    });

    test('deletes a todo', () => {
      const delBtn = screen.getAllByTitle('delete')[0];
      userEvent.click(delBtn);
      const nextName = screen.getAllByTestId('todo-name')[0];

      expect(nextName.innerHTML).not.toBe('JavaScript');
    });

    test('Increase the counter', () => {
      const button = screen.getAllByTitle('increase')[0];
      userEvent.click(button);
      const count = screen.getAllByTestId('todo-count')[0];

      expect(count.innerHTML).toBe('1');
    });

    test('Decrease the counter', () => {
      const button = screen.getAllByTitle('decrease')[2];
      userEvent.click(button);
      const count = screen.getAllByTestId('todo-count')[2];

      expect(count.innerHTML).toBe('2');
    });

    test('Resets all counters', () => {
      const button = screen.getByText('Reset All');
      userEvent.click(button);
      screen.getAllByTestId('todo-count').forEach((count) => {
        expect(count.innerHTML).toBe('0');
      });
    });
  });
});
