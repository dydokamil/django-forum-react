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
      sign_up
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
              disabled={submitting}
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

function mapStateToProps(state) {
  return { sign_up: state.sign_up };
}

export default connect(mapStateToProps, { signUp })(
  reduxForm({ form: "signupform" })(SignupForm)
);
