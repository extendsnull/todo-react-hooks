import React from 'react';
import './list.css';

export default function List(props) {
  const { children, setDoneTodo, setImportantTodo, deleteTodo } = props;

  const handleItemClick = id => {
    setImportantTodo(id);
  };

  const handleDoneButtonClick = id => {
    setDoneTodo(id);
  };

  const handleDeleteButtonClick = id => {
    deleteTodo(id);
  };

  const createList = data => {
    return data.map(({ label, id, done, important }) => {
      let labelClassName = '';

      if (done) {
        labelClassName += ' done';
      }

      if (important) {
        labelClassName += ' important';
      }

      return (
        <li key={id}>
          <span className={labelClassName} onClick={() => handleItemClick(id)}>
            {label}
          </span>
          <button
            className="done"
            type="button"
            onClick={() => handleDoneButtonClick(id)}
          >
            Done
          </button>
          <button
            className="delete"
            type="button"
            onClick={() => handleDeleteButtonClick(id)}
          >
            Delete
          </button>
        </li>
      );
    });
  };

  return <ul className="list">{createList(children)}</ul>;
}