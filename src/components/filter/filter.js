import React, { useState } from 'react';
import './filter.css';

const Filter = props => {
  const { sortType, sortTodo, filterTodo } = props;
  const [value, setValue] = useState('');
  const buttons = [
    {
      id: 'all',
      label: 'Show all',
    },
    {
      id: 'active',
      label: 'Show active',
    },
    {
      id: 'done',
      label: 'Show done',
    },
  ];

  const handleChange = ({ target }) => {
    const value = target.value;
    setValue(value);
    filterTodo(value);
  };

  const handleClick = id => {
    sortTodo(id);
  };

  return (
    <nav className="filter">
      <input
        type="text"
        placeholder="Type text to search..."
        value={value}
        onChange={handleChange}
      />
      <div className="filter-group">
        {buttons.map(button => {
          const { id, label } = button;
          const className = id === sortType ? 'active' : '';
          return (
            <button
              key={id}
              type="button"
              className={className}
              onClick={() => handleClick(id)}
            >
              {label}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Filter;
