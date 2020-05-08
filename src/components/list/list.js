import React from 'react';
import './list.scss';

const List = props => {
  const { children, setDoneTodo, setImportantTodo, deleteTodo } = props;

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
          <span className={labelClassName} onClick={() => setImportantTodo(id)}>
            {label}
          </span>
          <button
            className="done"
            type="button"
            onClick={() => setDoneTodo(id)}
          >
            Done
          </button>
          <button
            className="delete"
            type="button"
            onClick={() => deleteTodo(id)}
          >
            Delete
          </button>
        </li>
      );
    });
  };

  return <ul className="list">{createList(children)}</ul>;
};

export default List;
