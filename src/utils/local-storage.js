import getId from './get-id';

const setToLocalStorage = data => {
  const stringified = JSON.stringify(data);
  localStorage.setItem('todo-app-data', stringified);
};

const getFromLocalStorage = () => {
  const data = localStorage.getItem('todo-app-data');

  if (data) {
    return JSON.parse(data);
  }

  return [
    {
      label: 'Learn React',
      id: getId(),
      done: false,
      important: false,
    },
    {
      label: 'Drink Coffee',
      id: getId(),
      done: true,
      important: false,
    },
    {
      label: 'Create Todo App',
      id: getId(),
      done: false,
      important: false,
    },
  ];
};

export { setToLocalStorage, getFromLocalStorage };
