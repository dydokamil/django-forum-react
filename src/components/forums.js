import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchForums, fetchRecentTopics, fetchSections } from "../actions";
import { Link } from "react-router-dom";
import _ from "lodash";
import NavbarVertical from "./navbar_vertical";
// import { Link } from "react-router-dom";

class ForumsList extends Component {
  componentWillMount() {
    this.props.fetchForums();
    this.props.fetchSections();
    this.props.fetchRecentTopics();
  }

  render() {
    return _.isEmpty(this.props.forums) ? (
      <div>Loading...</div>
    ) : (
      <div className="container">
        <div className="row">
          <div className="col-lg-2">
            <NavbarVertical />
          </div>
          <div className="col-lg-10">
            {_.map(this.props.sections, section => {
              let forums = _.filter(this.props.forums, { section: section.id });
              return (
                <div className="container">
                  <table className="table forum-table">
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
                          <tr className="clickable-row" key={forum.id}>
                            <td>
                              <div>
                                <Link to={`/forums/${forum.id}`}>
                                  {forum.name}
                                </Link>
                              </div>
                              <div>{forum.description}</div>
                            </td>
                            <td>
                              {this.props.recent_topics &&
                              this.props.recent_topics[forum.id] ? (
                                <Link
                                  to={`/threads/${
                                    this.props.recent_topics[forum.id].id
                                  }`}
                                >
                                  {this.props.recent_topics[forum.id].name}
                                </Link>
                              ) : (
                                "No recent threads."
                              )}
                            </td>
                            <td>{forum.thread_set.length}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    forums: state.forums,
    sections: state.sections,
    recent_topics: state.recent_topics
  };
}

export default connect(mapStateToProps, {
  fetchForums,
  fetchSections,
  fetchRecentTopics
})(ForumsList);
