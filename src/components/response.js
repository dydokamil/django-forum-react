import React, { Component } from "react";
import { connect } from "react-redux";
import {
  respond,
  fetchResponses,
  editResponse,
  editThread,
  removeEditedResponse,
  removeEditedThread,
  changeMessage,
  changeMessageThread
} from "../actions";

class Response extends Component {
  constructor(props) {
    super(props);
    if (props.message) {
      this.state = { message: props.message };
    } else {
      this.state = { message: "" };
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ message: event.target.value.slice(0, 1000) });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.props.editingResponse) {
      // editing response
      this.props.editResponse(
        this.props.response_id,
        this.state.message,
        this.props.token_details.token
      );
      this.props.changeMessage(this.props.response_id, this.state.message);

      this.props.removeEditedResponse(this.props.response_id);
    } else if (this.props.editingThread) {
      // editing thread
      this.props.editThread(
        this.props.thread,
        this.state.message,
        this.props.token_details.token
      );
      this.props.changeMessageThread(this.props.thread, this.state.message);
      this.props.removeEditedThread(this.props.thread);
    } else {
      // new response
      this.props
        .respond(
          this.props.thread,
          this.state.message,
          this.props.token_details.token
        )
        .then(() => {
          this.props.fetchResponses(this.props.thread);
        });
    }
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
          {!this.props.message ? (
            <button
              disabled={this.state.message === ""}
              type="submit"
              className="btn btn-success"
            >
              <span className="fa fa-share" /> Respond
            </button>
          ) : (
            <button
              disabled={this.state.message === ""}
              type="submit"
              className="btn btn-warning"
            >
              <span className="fa fa-pencil" /> Edit
            </button>
          )}
        </form>
        {this.props.response_result.msg && (
          <div style={{ marginTop: "1rem" }} className="alert alert-success">
            {this.props.response_result.msg}
          </div>
        )}
        {this.props.response_result.errors && (
          <div style={{ marginTop: "1rem" }} className="alert alert-danger">
            {this.props.response_result.errors}
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

export default connect(mapStateToProps, {
  respond,
  fetchResponses,
  editResponse,
  editThread,
  removeEditedResponse,
  removeEditedThread,
  changeMessage,
  changeMessageThread
})(Response);
