import React from 'react';

const Form = ({ handleOnChange }) => {
  // Disable spacebar key
  document.onkeypress = function (e) {
    e = e || window.event;
    var charCode = e.keyCode || e.which;
    if (charCode === 32) {
      e.preventDefault();
      return false;
    }
  };

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
