import React from "react";

const Input = ({ name, label, value, type, error, onChange }) => {
  return (
    <React.Fragment>
      <div className="mb-3">
        <label htmlFor={name} className="form-label">
          {label}
        </label>
        <input
          type={type}
          name={name}
          /* autoFocus */
          value={value}
          onChange={onChange}
          /* ref={this.username} */
          className="form-control"
          id={name}
          /*aria-describedby="usernameHelp"*/
        />
      </div>
      {error && (
        <div className="alert alert-danger">
          <strong>{error}</strong>
        </div>
      )}
    </React.Fragment>
  );
};

export default Input;
