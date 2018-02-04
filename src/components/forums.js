import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchForums } from "../actions";
import { fetchSections } from "../actions";
import { Link } from "react-router-dom";
import _ from "lodash";
// import { Link } from "react-router-dom";

class ForumsList extends Component {
  componentDidMount() {
    this.props.fetchForums();
    this.props.fetchSections();
  }

  render() {
    if (_.isEmpty(this.props.forums)) {
      return <div>Loading...</div>;
    }

    return _.map(this.props.sections, section => {
      let forums = _.filter(this.props.forums, {
        section: section.id
      });

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
                        <Link to={`/forums/${forum.id}`}>{forum.name}</Link>
                      </div>
                      <div>{forum.description}</div>
                    </td>
                    <td>Recent topic placeholder</td>
                    <td>{forum.thread_set.length}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    });
  }
}

function mapStateToProps(state) {
  return { forums: state.forums, sections: state.sections };
}

export default connect(mapStateToProps, {
  fetchForums,
  fetchSections
})(ForumsList);
