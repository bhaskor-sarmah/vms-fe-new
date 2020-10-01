import React from "react";

const ShowError = ({ errors, name }) => {
  return errors[name] ? (
    <span id='name-error' className='error invalid-feedback'>
      {errors.name}
    </span>
  ) : (
    ""
  );
};

export default ShowError;
