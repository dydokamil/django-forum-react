import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchResponses, fetchUser, fetchThread, fetchForum } from "../actions";
import { Link } from "react-router-dom";
import Response from "./response";
import _ from "lodash";

class Thread extends Component {
  componentDidMount() {
    this.props.fetchThread(this.props.match.params.id).then(() => {
      this.props.fetchForum(this.props.thread.forum);
    });
    this.props.fetchResponses(this.props.match.params.id).then(() => {
      let responders = _.map(
        this.props.responses,
        response => response.responder
      );
      const threadCreator = this.props.thread.creator;

      responders = new Set(responders.concat(threadCreator));

      responders.forEach(responder => {
        this.props.fetchUser(responder);
      });
    });
  }

  render() {
    if (!this.props.thread) {
      return <div>Loading...</div>;
    }

    return (
      <div className="container" style={{ marginBottom: "2rem" }}>
        Current forum:{" "}
        <Link to={`/forums/${this.props.thread.forum}`}>
          {this.props.forums && this.props.forums[this.props.thread.forum]
            ? this.props.forums[this.props.thread.forum].name
            : this.props.thread.forum}
        </Link>
        <table className="table forum-table">
          <thead>
            <tr>
              <th>{this.props.thread.name}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div>{this.props.thread.created_datetime}</div>
                <div>
                  {this.props.thread.message !== "" ? (
                    this.props.thread.message
                  ) : (
                    <div className="text-danger">No content.</div>
                  )}
                </div>
                <hr />
                <div>
                  User:{" "}
                  {this.props.users[this.props.thread.creator] ? (
                    <Link
                      to={`/users/${
                        this.props.users[this.props.thread.creator].id
                      }`}
                    >
                      {this.props.users[this.props.thread.creator].username}
                    </Link>
                  ) : (
                    this.props.thread.creator
                  )}
                </div>
              </td>
            </tr>
            {_.map(this.props.responses, response => {
              return (
                <tr key={response.id}>
                  <td>
                    <div>{response.created_datetime}</div>
                    <div>{response.message}</div>
                    <hr />
                    <div>
                      User:{" "}
                      {this.props.users[response.responder] ? (
                        <Link
                          to={`/users/${
                            this.props.users[response.responder].id
                          }`}
                        >
                          {this.props.users[response.responder].username}
                        </Link>
                      ) : (
                        response.responder
                      )}
                    </div>
                  </td>
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
        {this.props.authenticated && (
          <div>
            <Response thread={this.props.match.params.id} />
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    thread: state.thread,
    responses: state.responses,
    authenticated: state.token_details.authenticated,
    users: state.users,
    forums: state.forums
  };
}

export default connect(mapStateToProps, {
  fetchThread,
  fetchResponses,
  fetchUser,
  fetchForum
})(Thread);
