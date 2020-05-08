const setToLocalStorage = data => {
  const stringified = JSON.stringify(data);
  localStorage.setItem('todo-app-data', stringified);
};

const getFromLocalStorage = () => {
  const data = localStorage.getItem('todo-app-data');

  if (data) {
    return JSON.parse(data);
  }

  return null;
};

export { setToLocalStorage, getFromLocalStorage };
