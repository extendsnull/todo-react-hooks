import React, { useState } from 'react';
import './add-item.css';

export default function AddItem(props) {
  const { addTodo } = props;
  const [value, setValue] = useState('');

  const handleSubmit = evt => {
    evt.preventDefault();
    addTodo(value.trim());
    setValue('');
  };

  const handleChange = ({ target }) => {
    const value = target.value.trimStart();
    setValue(value);
  };

  return (
    <form className="add-item" action="#" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type todo label"
        onChange={handleChange}
        value={value}
      />
      <button disabled={!value}>Add todo</button>
    </form>
  );
}
