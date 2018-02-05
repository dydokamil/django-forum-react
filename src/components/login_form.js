import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { fetchToken, addUserInfo } from "../actions";
import { connect } from "react-redux";
import _ from "lodash";

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

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit(values) {
    this.props.fetchToken(values).then(() => {
      if (!this.props.token_details.error) {
        this.props.addUserInfo(values.username);
        this.props.history.goBack();
      }
    });
  }

  render() {
    const {
      error,
      handleSubmit,
      pristine,
      reset,
      submitting,
      token_details
    } = this.props;

    return (
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit(this.submit)}>
          {token_details.error && (
            <div className="alert alert-danger">
              {_.map(token_details.error, error => error[0])}
            </div>
          )}

          <Field
            name="username"
            type="text"
            component={renderField}
            label="Username"
          />
          <Field
            name="password"
            type="password"
            component={renderField}
            label="Password"
          />
          {error && <strong>{error}</strong>}
          <div>
            <button
              className="btn btn-success"
              type="submit"
              disabled={submitting}
            >
              Log In
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
  return { token_details: state.token_details };
}

export default connect(mapStateToProps, { fetchToken, addUserInfo })(
  reduxForm({ form: "loginform" })(LoginForm)
);
