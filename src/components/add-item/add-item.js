import React, { useState } from 'react';
import './add-item.scss';

const AddItem = ({ addTodo, resetTodo }) => {
  const [value, setValue] = useState('');

  const handleSubmit = evt => {
    evt.preventDefault();
    addTodo(value.trim());
    setValue('');
  };

  const handleChange = ({ target }) => {
    const { value } = target;
    setValue(value);
  };

  return (
    <form className="add-item" action="#" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type todo label"
        onChange={handleChange}
        minLength="1"
        value={value}
      />
      <button disabled={!value.trim().length}>Add todo</button>
      <button type="button" onClick={resetTodo}>
        Reset list
      </button>
    </form>
  );
};

export default AddItem;
