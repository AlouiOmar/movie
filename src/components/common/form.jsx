import Joi from "joi-browser";
import React, { Component } from "react";
import Input from "./input";

class Form extends Component {
  state = { data: {}, errors: {} };
  validate = () => {
    const options = {
      abortEarly: false,
    };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };
  handleSubmit = (e) => {
    e.preventDefault();
    // const username = this.username.current.value;
    //const data = this.state.data;
    const errors = this.validate();
    console.log(errors);
    this.setState({ errors: errors || {} });
    this.doSubmit();
  };
  handleChange = (e) => {
    const data = { ...this.state.data };
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(e.currentTarget);
    if (errorMessage) errors[e.currentTarget.name] = errorMessage;
    else delete errors[e.currentTarget.name];
    data[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ data, errors });
  };
  renderButton(label) {
    return (
      <button
        type="submit"
        disabled={this.validate()}
        className="btn btn-primary"
      >
        {label}
      </button>
    );
  }
  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        label={label}
        name={name}
        value={data[name]}
        type={type}
        error={errors[name]}
        onChange={this.handleChange}
      ></Input>
    );
  }
}

export default Form;
