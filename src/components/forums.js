import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchForums } from "../actions";
import _ from "lodash";
// import { Link } from "react-router-dom";

class ForumsShow extends Component {
  componentDidMount() {
    this.props.fetchForums();
  }

  render() {
    if (_.isEmpty(this.props.forums)) {
      return <div>Loading...</div>;
    }
    console.log(this.props.forums);

    return (
      <ul>
        {this.props.forums.map((forum, idx) => {
          return <li key={idx}>{forum.name}</li>;
        })}
      </ul>
    );

    // return _.map(this.props.forums, forum => {
    // return <li>{forum.name}</li>;
    // });
  }
}

function mapStateToProps(state) {
  return { forums: state.forums };
}

export default connect(mapStateToProps, { fetchForums })(ForumsShow);
