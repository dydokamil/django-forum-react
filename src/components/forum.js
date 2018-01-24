import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchThreads } from "../actions";
import { Link } from "react-router-dom";
import _ from "lodash";
// import { Link } from "react-router-dom";

class Forum extends Component {
  componentDidMount() {
    this.props.fetchThreads(this.props.match.params.id);
  }

  render() {
    if (!this.props.threads) {
      return <div>Loading...</div>;
    }
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
            {_.map(this.props.threads, thread => {
              return (
                <tr key={thread.id}>
                  <td>
                    <Link to={`/threads/${thread.id}`}>{thread.name}</Link>
                  </td>
                  <td>replies</td>
                  <td>last activity</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Link to={"/forums"} className="btn btn-info">
          Forums list
        </Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { threads: state.threads };
}

export default connect(mapStateToProps, { fetchThreads })(Forum);
