import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { respond } from "../actions";

class Response extends Component {
  constructor(props) {
    super(props);
    this.state = { message: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ message: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.respond(
      this.props.thread,
      this.state.message,
      this.props.token_details.token
    );
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group" style={{ marginTop: "1rem" }}>
            <textarea
              className="form-control"
              rows="5"
              value={this.state.message}
              onChange={this.handleChange}
            />
          </div>
          <button
            disabled={this.state.message === ""}
            type="submit"
            className="btn btn-primary"
          >
            Respond
          </button>
        </form>
        {this.props.response_result.msg && (
          <div style={{ marginTop: "1rem" }}>
            {this.props.response_result.msg}
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    token_details: state.token_details,
    response_result: state.response_result
  };
}

export default connect(mapStateToProps, { respond })(Response);
