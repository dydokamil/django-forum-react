import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchThreads } from "../actions";
import { Link } from "react-router-dom";
import _ from "lodash";
import { formatDateTime } from "../utils";
// import { Link } from "react-router-dom";

class Forum extends Component {
  componentWillMount() {
    this.props.fetchThreads(this.props.match.params.id);
  }

  render() {
    if (!this.props.threads) {
      return <div>Loading...</div>;
    }

    const threads = _.orderBy(
      this.props.threads,
      ["pinned", "last_activity"],
      ["desc", "desc"]
    );

    return (
      <div className="container">
        <table className="table forum-table">
          <thead>
            <tr>
              <th>All posts</th>
              <th>Replies</th>
              <th>Last activity</th>
            </tr>
          </thead>
          <tbody>
            {_.map(threads, thread => {
              return (
                <tr
                  className={`${thread.pinned ? "pinned-thread" : ""}`}
                  key={thread.id}
                >
                  <td>
                    <Link to={`/threads/${thread.id}`}>{thread.name}</Link>
                  </td>
                  <td>{thread.threadresponse_set.length}</td>
                  <td>{formatDateTime(thread.last_activity)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Link
          to={"/forums"}
          className="btn btn-info"
          style={{ marginRight: ".5rem" }}
        >
          <span className="fa fa-list" /> Forums list
        </Link>
        {this.props.token_details.authenticated && (
          <Link
            to={`/new_thread/${this.props.match.params.id}`}
            className="btn btn-success"
          >
            <span className="fa fa-plus" /> New thread
          </Link>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { threads: state.threads, token_details: state.token_details };
}

export default connect(mapStateToProps, { fetchThreads })(Forum);
