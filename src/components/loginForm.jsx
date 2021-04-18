import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };
  //username = React.createRef();

  doSubmit() {
    console.log("data submitted");
  }

  render() {
    return (
      <div>
        <h1>Login Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;

/* <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              name="username"
              /* autoFocus */
/*  value={data.username}
              onChange={this.handleChange}
              /* ref={this.username} */
/*  className="form-control"
              id="username"
              aria-describedby="usernameHelp"
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={this.handleChange}
              className="form-control"
              id="password"
            />
          </div>
          */
/* validate = () => {
    const result = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });
    console.log(result);
    const errors = {};
    const { data } = this.state;
    if (data.username.trim() === "")
      errors.username = "Username field is required!";
    if (data.password.trim() === "")
      errors.password = "Password field is required!";
    return Object.keys(errors).length === 0 ? null : errors;
  }; 
  validateProperty = (input) => {
    if (input.value.trim() === "") return input.name + " field is required!";
  };
  */
