import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions";

class Navbar extends Component {
  logoutHandler() {
    const token = this.props.token_details.token;
    this.props.logout(token);
  }

  render() {
    return (
      <nav
        id={this.props.id}
        className="navbar navbar-expand-md bg-dark navbar-dark"
      >
        <Link className="navbar-brand" to="/forums/">
          Forum
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/forums">
                View Forum
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              {this.props.authenticated ? (
                <ul
                  className="cursor-pointer nav-link"
                  onClick={this.logoutHandler.bind(this)}
                >
                  <span className="fa fa-sign-out" /> Logout
                </ul>
              ) : (
                <Link className="nav-link" to="/login">
                  <span className="fa fa-sign-in" /> Login
                </Link>
              )}
            </li>

            <li className="nav-item">
              {!this.props.authenticated ? (
                <Link className="nav-link" to="/signup">
                  <span className="fa fa-user-plus" />
                  Sign up
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
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.token_details.authenticated,
    token_details: state.token_details
  };
}

export default connect(mapStateToProps, { logout })(Navbar);
