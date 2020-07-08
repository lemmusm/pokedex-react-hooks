import React from 'react';

const Form = ({ handleOnChange }) => {
  return (
    <form>
      <input
        type="text"
        placeholder="Insert pokemon id"
        name="id"
        onChange={handleOnChange}
      />
    </form>
  );
};

export default Form;
