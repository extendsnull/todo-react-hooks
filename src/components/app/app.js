import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from '../header';
import Filter from '../filter';
import List from '../list';
import AddItem from '../add-item';
import './app.css';

const getId = () => {
  return uuidv4();
};

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

export default function App() {
  const [data, setData] = useState(getFromLocalStorage());
  const [sort, setSort] = useState('all');
  const [filter, setFilter] = useState('');

  const addTodo = label => {
    setData(prev => {
      const newList = [
        ...prev,
        {
          label: label.trim(),
          id: getId(),
          done: false,
          important: false,
        },
      ];

      setToLocalStorage(newList);
      return newList;
    });
  };

  const getTodoId = incomingId => {
    return data.findIndex(({ id }) => id === incomingId);
  };

  const setImportantTodo = incomingId => {
    setData(prev => {
      const findItemId = getTodoId(incomingId);
      const item = prev[findItemId];

      const newList = [
        ...prev.slice(0, findItemId),
        { ...item, important: !item.important },
        ...prev.slice(findItemId + 1),
      ];

      setToLocalStorage(newList);
      return newList;
    });
  };

  const setDoneTodo = incomingId => {
    setData(prev => {
      const findItemId = getTodoId(incomingId);
      const item = prev[findItemId];

      const newList = [
        ...prev.slice(0, findItemId),
        { ...item, done: !item.done },
        ...prev.slice(findItemId + 1),
      ];

      setToLocalStorage(newList);
      return newList;
    });
  };

  const deleteTodo = incomingId => {
    setData(prev => {
      const findItemId = getTodoId(incomingId);
      const newList = [
        ...prev.slice(0, findItemId),
        ...prev.slice(findItemId + 1),
      ];

      setToLocalStorage(newList);
      return newList;
    });
  };

  const sortTodo = () => {
    switch (sort) {
      case 'all':
      default:
        return data;
      case 'active':
        return data.filter(({ active }) => active);
      case 'done':
        return data.filter(({ active }) => !active);
    }
  };

  const filterTodo = value => {
    setFilter(value);
  };

  const showTodo = () => {
    if (!filter.trim().length) {
      return sortTodo();
    }
    return sortTodo().filter(
      ({ label }) => label.toLowerCase().indexOf(filter.toLowerCase()) > -1
    );
  };

  return (
    <div className="app">
      <Header />
      <Filter sortTodo={setSort} filterTodo={filterTodo} sortType={sort} />
      <List
        setDoneTodo={setDoneTodo}
        setImportantTodo={setImportantTodo}
        deleteTodo={deleteTodo}
      >
        {showTodo()}
      </List>
      <AddItem addTodo={addTodo} />
    </div>
  );
}
