import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUser } from "../actions";
import _ from "lodash";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { current: "responses" };
    this.setResponses = this.setResponses.bind(this);
    this.setThreads = this.setThreads.bind(this);
  }
  componentDidMount() {
    this.props.fetchUser(this.props.match.params.id);
  }

  setResponses() {
    this.setState({ current: "responses" });
  }

  setThreads() {
    this.setState({ current: "threads" });
  }

  render() {
    if (_.isEmpty(this.props.users)) {
      return <div className="container">Loading...</div>;
    }

    if (this.props.users.errors) {
      return <div className="container">User not found.</div>;
    }

    const user = this.props.users[this.props.match.params.id];

    return (
      <div className="container">
        <h1>{user.username}</h1>
        <div>Banned until: {user.banned_until}</div>
        <div>Can ban users: {user.can_ban ? "Yes" : "No"}</div>
        <hr />

        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a
              id="responses"
              className={`nav-link pointer ${
                this.state.current === "responses" ? "active" : ""
              }`}
              onClick={this.setResponses}
            >
              Responses
            </a>
          </li>
          <li className="nav-item">
            <a
              id="threads"
              className={`nav-link pointer ${
                this.state.current == "threads" ? "active" : ""
              }`}
              onClick={this.setThreads}
            >
              Threads
            </a>
          </li>
        </ul>
        <div className="card card-responses">
          {this.state.current == "responses"
            ? user.user_responses.map(response => {
                return (
                  <div className="card card-response">
                    <div className="card-block">{response}</div>
                  </div>
                );
              })
            : user.user_threads.map(thread => {
                return (
                  <div className="card card-response">
                    <div className="card-block">{thread}</div>
                  </div>
                );
              })}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { users: state.users };
}

export default connect(mapStateToProps, { fetchUser })(UserProfile);
