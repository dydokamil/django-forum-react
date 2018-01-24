import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { fetchToken } from "../actions";
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

class SubmitValidationForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit(values) {
    this.props.fetchToken(values).then(() => {
      if (
        this.props.token_details.token &&
        localStorage.getItem("id_token") === null
      ) {
        localStorage.setItem("id_token", this.props.token_details.token);
      }

      if (!this.props.token_details.errors) {
        this.props.history.push("/");
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
      fetchToken,
      token_details
    } = this.props;
    const { token, errors } = token_details;

    return (
      <div className="container">
        <form onSubmit={handleSubmit(this.submit)}>
          {errors && (
            <div className="alert alert-danger">
              {_.map(errors, error => error)}
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

export default connect(mapStateToProps, { fetchToken })(
  reduxForm({ form: "loginform" })(SubmitValidationForm)
);
