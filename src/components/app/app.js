import React, { useState } from 'react';
import {
  setToLocalStorage,
  getFromLocalStorage,
} from '../../utils/local-storage';
import getId from '../../utils/get-id';
import Header from '../header';
import Filter from '../filter';
import List from '../list';
import AddItem from '../add-item';
import './app.css';

const App = () => {
  const [data, setData] = useState(getFromLocalStorage());
  const [sort, setSort] = useState('active');
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
        return data.filter(({ done }) => !done);
      case 'done':
        return data.filter(({ done }) => done);
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
};

export default App;
