import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions";

class NavbarVertical extends Component {
  logoutHandler() {
    const token = this.props.token_details.token;
    this.props.logout(token);
  }

  render() {
    return (
      <div>
        <div className="clickable-row">
          <Link className="nav-link" to="/forums">
            <span className="fa fa-list" /> Forums
          </Link>
        </div>
        <div className="clickable-row">
          {this.props.authenticated ? (
            <a
              href="#"
              role="button"
              className="nav-link"
              onClick={this.logoutHandler.bind(this)}
            >
              <span className="fa fa-sign-out" /> Logout
            </a>
          ) : (
            <Link className="nav-link" to="/login">
              <span className="fa fa-sign-in" /> Login
            </Link>
          )}
        </div>

        <div className="nav-item clickable-row">
          {!this.props.authenticated ? (
            <Link className="nav-link" to="/signup">
              <span className="fa fa-user-plus" /> Sign up
            </Link>
          ) : (
            <Link
              className="nav-link"
              to={`/users/${this.props.token_details.user_id}`}
            >
              <span className="fa fa-user" />{" "}
              {this.props.token_details.username}
            </Link>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.token_details.authenticated,
    token_details: state.token_details
  };
}

export default connect(mapStateToProps, { logout })(NavbarVertical);
