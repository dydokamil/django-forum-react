import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchForums } from "../actions";
import { fetchSections } from "../actions";
import _ from "lodash";
// import { Link } from "react-router-dom";

class ForumsShow extends Component {
  componentDidMount() {
    this.props.fetchForums();
    this.props.fetchSections();
  }

  render() {
    if (_.isEmpty(this.props.forums)) {
      return <div>Loading...</div>;
    }

    return _.map(this.props.sections, section => {
      let forums = this.props.forums.filter(
        forum => forum.section === section.id
      );

      return (
        <table className="table forum-table" key={section.id}>
          <thead>
            <tr>
              <th>{section.name.toUpperCase()}</th>
              <th>Recent posts</th>
              <th>Topics</th>
            </tr>
          </thead>

          <tbody>
            {_.map(forums, forum => {
              return (
                <tr key={forum.id} className="clickable-row">
                  <td>{forum.name}</td>
                  <td>
                    {forum.thread_set.length > 0
                      ? _.last(forum.thread_set)
                      : "No recent topics"}
                  </td>
                  <td>{forum.thread_set.length}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    });
  }
}

function mapStateToProps(state) {
  return { forums: state.forums, sections: state.sections };
}

export default connect(mapStateToProps, { fetchForums, fetchSections })(
  ForumsShow
);
