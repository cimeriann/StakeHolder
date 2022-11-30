import React from "react";

const Input = (props) => {
  const id = Math.random().toString();
  return (
    <div className="ui-input">
      <label htmlFor={id} className="ui-input-desc">
        {props.description}
      </label>
      <input
        id={id}
        className="ui-input-field"
        value={props.value}
        onChange={props.onChange}
        type="text"
        placeholder="10"
      />
    </div>
  );
};

export default Input;
