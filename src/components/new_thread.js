import React, { Component } from "react";
import { connect } from "react-redux";
import { newThread } from "../actions";
import { Field, reduxForm } from "redux-form";

const renderField = ({
  input,
  label,
  type,
  textArea,
  meta: { touched, error }
}) => (
  <div className="form-group">
    <label>{label}</label>
    <div>
      {textArea ? (
        <textarea
          {...input}
          placeholder={label}
          type={type}
          className="form-control"
          rows="5"
        />
      ) : (
        <input
          {...input}
          placeholder={label}
          type={type}
          className="form-control"
        />
      )}
      {touched && error && <span className="text-danger">{error}</span>}
    </div>
  </div>
);

class NewThread extends Component {
  constructor(props) {
    super(props);
    this.forum = this.props.match.params.id;

    this.submit = this.submit.bind(this);
  }

  submit(values) {
    console.log(values);

    this.props
      .newThread(
        this.forum,
        values.name,
        values.message,
        this.props.token_details.token
      )
      .then(() => {
        this.props.history.push(
          `/threads/${this.props.create_thread_details.id}`
        );
      });
  }

  render() {
    if (!this.props.token_details) {
      return <div className="container">Loading...</div>;
    }
    if (!this.props.token_details.authenticated) {
      return (
        <div className="container">
          Please log in before entering this page.
        </div>
      );
    }
    return (
      <div className="container">
        <form onSubmit={this.props.handleSubmit(this.submit)}>
          <Field
            component={renderField}
            name="name"
            label="Topic"
            className="form-control"
            type="text"
          />
          <Field
            component={renderField}
            name="message"
            label="Message"
            className="form-control"
            type="text"
            textArea={true}
          />
          <button
            disabled={this.props.invalid}
            className="btn btn-success"
            type="submit"
          >
            <span className="fa fa-plus" /> Submit
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.length > 100) {
    errors.name = "Must be 100 characters or less.";
  }

  if (!values.message) {
    errors.message = "Required";
  } else if (values.message.length > 1000) {
    errors.message = "Must be at most 100 characters.";
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    token_details: state.token_details,
    create_thread_details: state.create_thread_details
  };
}

export default connect(mapStateToProps, { newThread })(
  reduxForm({ form: "newThreadForm", validate })(NewThread)
);
