import React, { Component } from "react";

export default class Navbar extends Component {
  render() {
    return (
      <nav
        id={this.props.id}
        className="navbar navbar-expand-md bg-dark navbar-dark"
      >
        <a className="navbar-brand" href="/forums/">
          Forum
        </a>

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
              <a className="nav-link" href="/forums">
                View Forum
              </a>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="/login/">
                <span className="fa fa-sign-in" />
                {localStorage.getItem("id_token") === null ? "Login" : "Logout"}
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/signup/">
                <span className="fa fa-user-plus" />
                Sign up
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
