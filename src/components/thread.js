import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchResponses,
  fetchUser,
  fetchThread,
  fetchForum,
  deleteResponse,
  deleteThread,
  addEditedResponse,
  removeEditedResponse,
  addEditedThread,
  removeEditedThread
} from "../actions";
import { formatDateTime } from "../utils";
import { Link } from "react-router-dom";
import Response from "./response";
import _ from "lodash";
import NavbarVertical from "./navbar_vertical";

class Thread extends Component {
  constructor(props) {
    super(props);

    this.deleteThread = this.deleteThread.bind(this);
    this.deleteResponse = this.deleteResponse.bind(this);

    this.editResponse = this.editResponse.bind(this);
    this.editThread = this.editThread.bind(this);
  }

  componentDidMount() {
    this.props.fetchThread(this.props.match.params.id).then(() => {
      this.props.fetchForum(this.props.thread.forum);
    });
    this.props.fetchResponses(this.props.match.params.id).then(() => {
      let responders = _.map(
        this.props.responses,
        response => response.creator
      );
      const threadCreator = this.props.thread.creator;

      responders = new Set(responders.concat(threadCreator));

      responders.forEach(responder => {
        this.props.fetchUser(responder);
      });
    });
  }

  deleteThread(event, id) {
    this.props.deleteThread(id, this.props.token_details.token);
    this.props.history.push(`/forums/${this.props.thread.forum}`);
  }

  deleteResponse(event, id) {
    this.props.deleteResponse(id, this.props.token_details.token);
  }

  editResponse(event, id) {
    this.props.addEditedResponse(id);
  }

  editThread(event, id) {
    this.props.addEditedThread(id);
  }

  render() {
    return !this.props.thread ? (
      <div>Loading...</div>
    ) : (
      <div className="container">
        <div className="row">
          <div className="col-lg-2">
            <NavbarVertical />
          </div>
          <div className="col-lg-10">
            <table className="table forum-table">
              <thead>
                <tr>
                  <th>{this.props.thread.name}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {!_.includes(
                    this.props.edited_threads,
                    this.props.thread.id
                  ) ? (
                    <td>
                      <div>
                        {this.props.thread.created_datetime
                          ? formatDateTime(this.props.thread.created_datetime)
                          : ""}
                      </div>
                      <div>
                        {this.props.thread.message !== "" ? (
                          this.props.thread.message
                        ) : (
                          <div className="text-danger">No content.</div>
                        )}
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-lg-6">
                          User:{" "}
                          {this.props.users[this.props.thread.creator] ? (
                            <Link
                              to={`/users/${
                                this.props.users[this.props.thread.creator].id
                              }`}
                            >
                              {
                                this.props.users[this.props.thread.creator]
                                  .username
                              }
                            </Link>
                          ) : (
                            this.props.thread.creator
                          )}
                        </div>
                        {this.props.token_details.authenticated &&
                          this.props.token_details.user_id ===
                            this.props.thread.creator && (
                            <div className="col-lg-6 float-right">
                              <span className="float-lg-right">
                                <button
                                  className="btn btn-info"
                                  onClick={event => {
                                    this.editThread(
                                      event,
                                      this.props.thread.id
                                    );
                                  }}
                                >
                                  <span className="fa fa-pencil" /> Edit
                                </button>
                                <button
                                  onClick={event => {
                                    this.deleteThread(
                                      event,
                                      this.props.thread.id
                                    );
                                  }}
                                  className="btn btn-danger"
                                >
                                  <span className="fa fa-trash" /> Delete
                                </button>
                              </span>
                            </div>
                          )}
                      </div>
                    </td>
                  ) : (
                    <td>
                      <Response
                        message={this.props.thread.message}
                        thread={this.props.thread.id}
                        editingThread={true}
                      />
                    </td>
                  )}
                </tr>
                {_.map(this.props.responses, response => {
                  return (
                    <tr key={response.id}>
                      {!_.includes(this.props.edited_responses, response.id) ? (
                        <td>
                          <div>{formatDateTime(response.created_datetime)}</div>
                          <div>{response.message}</div>
                          <hr />
                          <div className="row">
                            <div className="col-lg-6">
                              User:{" "}
                              {this.props.users[response.creator] ? (
                                <Link
                                  to={`/users/${
                                    this.props.users[response.creator].id
                                  }`}
                                >
                                  {this.props.users[response.creator].username}
                                </Link>
                              ) : (
                                response.creator
                              )}
                            </div>

                            {this.props.token_details.authenticated &&
                              this.props.token_details.user_id ===
                                response.creator && (
                                <div className="col-lg-6 float-right">
                                  <span className="float-lg-right">
                                    <button
                                      className="btn btn-info"
                                      onClick={event => {
                                        this.editResponse(event, response.id);
                                      }}
                                    >
                                      <span className="fa fa-pencil" /> Edit
                                    </button>
                                    <button
                                      onClick={event => {
                                        this.deleteResponse(event, response.id);
                                      }}
                                      className="btn btn-danger"
                                    >
                                      <span className="fa fa-trash" /> Delete
                                    </button>
                                  </span>
                                </div>
                              )}
                          </div>
                        </td>
                      ) : (
                        <td>
                          <Response
                            message={response.message}
                            response_id={response.id}
                            thread={this.props.thread.id}
                            editingResponse={true}
                          />
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <Link
              to={`/forums/${this.props.thread.forum}`}
              className="btn btn-info"
            >
              <span className="fa fa-caret-left" /> Back to{" "}
              {this.props.forums && this.props.forums[this.props.thread.forum]
                ? this.props.forums[this.props.thread.forum].name
                : this.props.thread.forum}
            </Link>
            {this.props.token_details.authenticated && (
              <div>
                <Response thread={this.props.match.params.id} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    thread: state.thread,
    responses: state.responses,
    token_details: state.token_details,
    users: state.users,
    forums: state.forums,
    edited_responses: state.edited_responses,
    edited_threads: state.edited_threads
  };
}

export default connect(mapStateToProps, {
  fetchThread,
  fetchResponses,
  fetchUser,
  fetchForum,
  deleteThread,
  deleteResponse,
  addEditedResponse,
  removeEditedResponse,
  addEditedThread,
  removeEditedThread
})(Thread);
