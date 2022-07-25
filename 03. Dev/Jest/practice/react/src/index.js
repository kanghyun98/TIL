import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/app';
import '@fortawesome/fontawesome-free/js/all.js';
import TodoPresenter from './logics/todo_presenter';

const todoPresenter = new TodoPresenter([
  { id: 1, name: 'JavaScript', count: 0 },
  { id: 2, name: 'TypeScript', count: 0 },
  { id: 3, name: 'React', count: 0 },
]);

ReactDOM.render(
  <React.StrictMode>
    <App presenter={todoPresenter} />
  </React.StrictMode>,
  document.getElementById('root')
);
