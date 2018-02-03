import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUser, fetchManyThreads, fetchManyResponses } from "../actions";
import _ from "lodash";
import { Link } from "react-router-dom";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { current: "responses" };
    this.setResponses = this.setResponses.bind(this);
    this.setThreads = this.setThreads.bind(this);
  }

  componentDidMount() {
    this.props.fetchUser(this.props.match.params.id).then(() => {
      this.props.fetchManyThreads(
        this.props.users[this.props.match.params.id].user_threads
      );
      this.props
        .fetchManyResponses(
          this.props.users[this.props.match.params.id].user_responses
        )
        .then(() => {
          const threads = _.map(
            this.props.responses,
            response => response.thread
          );
          this.props.fetchManyThreads(threads);
        });
    });
  }

  setResponses() {
    this.setState({ current: "responses" });
  }

  setThreads() {
    this.setState({ current: "threads" });
  }

  render() {
    if (
      _.isEmpty(this.props.users) ||
      _.isEmpty(this.props.responses) ||
      _.isEmpty(this.props.threads)
    ) {
      return <div className="container">Loading...</div>;
    }

    if (this.props.users.errors) {
      return <div className="container">User not found.</div>;
    }

    const user = this.props.users[this.props.match.params.id];
    const responses = user.user_responses;
    const threads = user.user_threads;

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
            ? responses.map(response => {
                return (
                  <div className="card card-response">
                    <div className="card-block">
                      <h6>{this.props.responses[response].message}</h6>
                      <small>
                        {this.props.responses[response].created_datetime}
                      </small>
                      <div>
                        In:{" "}
                        {this.props.threads[
                          this.props.responses[response].thread
                        ] && (
                          <Link
                            to={`/threads/${
                              this.props.threads[
                                this.props.responses[response].thread
                              ].id
                            }`}
                          >
                            {
                              this.props.threads[
                                this.props.responses[response].thread
                              ].name
                            }
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            : threads.map(thread => {
                return (
                  <div className="card card-response">
                    <div className="card-block">
                      <Link to={`/threads/${thread}`}>
                        <h6>{this.props.threads[thread].name}</h6>
                      </Link>
                      <small>
                        {this.props.threads[thread].created_datetime}
                      </small>
                      <hr />
                      <div>{this.props.threads[thread].message}</div>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users,
    responses: state.responses,
    threads: state.threads
  };
}

export default connect(mapStateToProps, {
  fetchUser,
  fetchManyThreads,
  fetchManyResponses
})(UserProfile);
