class TodoPresenter {
  constructor(todos) {
    this.todos = todos;
  }

  getTodos() {
    return this.todos;
  }

  increment(todo, update) {
    this.todos = this.todos.map((item) => {
      if (item.id === todo.id) {
        return { ...todo, count: todo.count + 1 };
      }
      return item;
    });

    update(this.todos);
  }

  decrement(todo, update) {
    this.todos = this.todos.map((item) => {
      if (item.id === todo.id) {
        const count = item.count - 1;
        return { ...todo, count: count < 0 ? 0 : count };
      }
      return item;
    });

    update(this.todos);
  }

  delete(todo, update) {
    this.todos = this.todos.filter((item) => item.id !== todo.id);

    update(this.todos);
  }

  add(name, update) {
    this.todos = [...this.todos, { id: Date.now(), name, count: 0 }];

    update(this.todos);
  }

  reset(update) {
    this.todos = this.todos.map((todo) => {
      if (todo.count !== 0) {
        return { ...todo, count: 0 };
      }
      return todo;
    });

    update(this.todos);
  }
}

export default TodoPresenter;
