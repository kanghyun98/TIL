import TodoPresenter from '../todo_presenter.js';

describe('TodoPresenter', () => {
  const todos = [
    { id: 1, name: 'JavaScript', count: 1 },
    { id: 2, name: 'TypeScript', count: 0 },
  ];

  let presenter;
  let update;

  beforeEach(() => {
    presenter = new TodoPresenter(todos);
    update = jest.fn();
  });

  test('init', () => {
    expect(presenter.getTodos()).toEqual(todos);
  });

  test('increments todo count', () => {
    presenter.increment(todos[0], update);

    expect(presenter.getTodos()[0].count).toBe(2);
    checkUpdateCalled();
  });

  test('decrements todo count', () => {
    presenter.decrement(todos[0], update);

    expect(presenter.getTodos()[0].count).toBe(0);
    checkUpdateCalled();
  });

  test('does not set the count value below 0', () => {
    presenter.decrement(todos[0], update);
    presenter.decrement(todos[0], update);

    expect(presenter.getTodos()[0].count).toBe(0);
    checkUpdateCalled(2);
  });

  test('delete todo from the list', () => {
    presenter.delete(todos[0], update);

    expect(presenter.getTodos().length).toBe(1);
    expect(presenter.getTodos()[0].name).toBe('TypeScript');
    checkUpdateCalled();
  });

  test('adds todo to the list', () => {
    presenter.add('React', update);

    expect(presenter.getTodos().length).toBe(3);
    expect(presenter.getTodos()[2].name).toBe('React');
    expect(presenter.getTodos()[2].count).toBe(0);
    checkUpdateCalled();
  });

  describe('reset', () => {
    test('reset all todos count to 0', () => {
      presenter.reset(update);

      expect(presenter.getTodos()[0].count).toBe(0);
      expect(presenter.getTodos()[1].count).toBe(0);
      checkUpdateCalled();
    });

    test('does not create object when count is 0', () => {
      const todos = presenter.getTodos();
      presenter.reset(update);
      const updateTodos = presenter.getTodos();

      expect(updateTodos[1]).toBe(todos[1]);
    });
  });

  const checkUpdateCalled = (number = 1) => {
    expect(update).toHaveBeenCalledTimes(number);
    expect(update).toHaveBeenCalledWith(presenter.getTodos());
  };
});
