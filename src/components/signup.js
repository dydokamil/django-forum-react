import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { signUp } from "../actions";
import { connect } from "react-redux";
import _ from "lodash";
import Cookies from "universal-cookie";

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div className="form-group">
    <label>{label}</label>
    <div>
      <input
        {...input}
        placeholder={label}
        type={type}
        className="form-control"
      />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit(values) {
    this.props.signUp(values).then(() => {});
  }

  render() {
    const {
      error,
      handleSubmit,
      pristine,
      reset,
      submitting,
      signUp,
      sign_up,
      invalid
    } = this.props;

    return (
      <div className="container">
        <h1>Sign up</h1>
        <form onSubmit={handleSubmit(this.submit)}>
          {sign_up.errors && (
            <div className="alert alert-danger">
              {_.map(sign_up.errors, error => <div>{error}</div>)}
            </div>
          )}
          {sign_up.username && (
            <div className="alert alert-success">
              User {sign_up.username} created successfully
            </div>
          )}

          <Field
            name="username"
            type="text"
            component={renderField}
            label="Username"
          />
          <Field
            name="password1"
            type="password"
            component={renderField}
            label="Password"
          />
          <Field
            name="password2"
            type="password"
            component={renderField}
            label="Confirm password"
          />
          {error && <strong>{error}</strong>}
          <div>
            <button
              className="btn btn-success"
              type="submit"
              disabled={submitting || invalid}
            >
              Sign Up
            </button>
            <button
              className="btn btn-warning"
              type="button"
              disabled={pristine || submitting}
              onClick={reset}
            >
              Clear Values
            </button>
          </div>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.username) {
    errors.username = "Required";
  } else if (values.username.length > 15) {
    errors.username = "Must be 15 characters or less";
  }

  if (!values.password1) {
    errors.password1 = "Required";
  } else if (values.password1.length <= 6) {
    errors.password1 = "Must be 6 characters or more";
  }

  if (!values.password2) {
    errors.password2 = "Required";
  }

  if (values.password1 && values.password2) {
    if (values.password1 !== values.password2) {
      errors.password2 = "Passwords don't match";
    }
  }

  return errors;
}

function mapStateToProps(state) {
  return { sign_up: state.sign_up };
}

export default connect(mapStateToProps, { signUp })(
  reduxForm({ form: "signupform", validate })(SignupForm)
);
