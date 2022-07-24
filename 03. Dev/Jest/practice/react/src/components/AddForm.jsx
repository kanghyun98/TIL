import React, { memo } from 'react';

const AddForm = memo((props) => {
  const inputRef = React.createRef();

  const onSubmit = (event) => {
    event.preventDefault();
    const name = inputRef.current.value;
    name && props.onAdd(name);
    inputRef.current.value = '';
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <input
        ref={inputRef}
        type="text"
        className="add-input"
        placeholder="To-do"
      />
      <button className="add-button">Add</button>
    </form>
  );
});

export default AddForm;
