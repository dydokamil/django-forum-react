import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchUser,
  fetchManyThreads,
  fetchManyResponses,
  clearResponses
} from "../actions";
import { formatDateTime } from "../utils";
import _ from "lodash";
import { Link } from "react-router-dom";
import NavbarVertical from "./navbar_vertical";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { current: "responses" };
    this.setResponses = this.setResponses.bind(this);
    this.setThreads = this.setThreads.bind(this);
  }

  componentWillMount() {
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
    let user = this.props.users[this.props.match.params.id];
    let responses = user ? user.user_responses : undefined;
    let threads = user ? user.user_threads : undefined;

    return _.isEmpty(this.props.users) ? (
      <div className="container">Loading...</div>
    ) : this.props.users.errors ? (
      <div className="container">User not found.</div>
    ) : (
      <div className="container">
        <div className="row">
          <div className="col-lg-2">
            <NavbarVertical />
          </div>
          <div className="col-lg-10">
            <h1>{user.username}</h1>
            {user.banned_until && (
              <div>Banned until: {formatDateTime(user.banned_until)}</div>
            )}
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
                    this.state.current === "threads" ? "active" : ""
                  }`}
                  onClick={this.setThreads}
                >
                  Threads
                </a>
              </li>
            </ul>
            <div className="card card-responses">
              {this.state.current === "responses"
                ? responses.map(response => {
                    return (
                      <div key={response} className="card card-response">
                        <div className="card-block">
                          <h6>
                            {this.props.responses[response]
                              ? this.props.responses[response].message
                              : "Loading"}
                          </h6>
                          <small>
                            {this.props.responses[response]
                              ? formatDateTime(
                                  this.props.responses[response]
                                    .created_datetime
                                )
                              : "Loading..."}
                          </small>
                          <div>
                            In:{" "}
                            {this.props.responses[response] &&
                            this.props.threads[
                              this.props.responses[response].thread
                            ] ? (
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
                            ) : (
                              "Loading"
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                : threads.map(thread => {
                    return (
                      <div key={thread} className="card card-response">
                        <div className="card-block">
                          <Link to={`/threads/${thread}`}>
                            <h6>{this.props.threads[thread].name}</h6>
                          </Link>
                          <small>
                            {formatDateTime(
                              this.props.threads[thread].created_datetime
                            )}
                          </small>
                          <hr />
                          <div>{this.props.threads[thread].message}</div>
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
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
  fetchManyResponses,
  clearResponses
})(UserProfile);
