import Joi from "joi-browser";
import React, { useState } from "react";
import Form from "./common/form";
import { addMovie } from "../services/fakeMovieService";
const MovieForm = () => {
  const [info, setInfo] = useState({
    data: {
      username: "",
    },
    errors: {},
  });
  const schema = {
    username: Joi.string().required().label("username"),
  };

  function validate() {
    const options = {
      abortEarly: false,
    };
    const { error } = Joi.validate(info.data, schema, options);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  }

  function validateProperty({ name, value }) {
    const obj = { [name]: value };
    const schemaa = { [name]: schema[name] };
    const { error } = Joi.validate(obj, schemaa);
    return error ? error.details[0].message : null;
  }
  function handleSubmit(e) {
    e.preventDefault();
    // const username = this.username.current.value;
    //const data = info.data;
    const errors = validate();
    console.log(errors);
    setInfo({ errors: errors || {} });
    console.log(info.data);
  }
  function handleChange(e) {
    console.log(e.currentTarget.name);
    const data = { ...info.data };
    const errors = { ...info.errors };
    const errorMessage = validateProperty(e.currentTarget);
    if (errorMessage) errors[e.currentTarget.name] = errorMessage;
    else delete errors[e.currentTarget.name];
    data[e.currentTarget.name] = e.currentTarget.value;
    setInfo({ data, errors });
  }

  return (
    <div>
      <h1>Movie Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              "username"
            </label>
            <input
              type="text"
              name="username"
              /* autoFocus */
              onChange={handleChange}
              /* ref={this.username} */
              className="form-control"
              id="username"
              /*aria-describedby="usernameHelp"*/
            />
          </div>
          {info.errors["username"] && (
            <div className="alert alert-danger">
              <strong>{info.errors["username"]}</strong>
            </div>
          )}
        </div>
        {/*  {this.renderInput("title", "Title")}
          {this.renderInput("genre", "Genre")}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate", "number")}
          {this.renderButton("Save")} */}
        <button type="submit" disabled={validate()} className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
};

export default MovieForm;
