import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <div className="container">
        <div className="col-lg-12">
          <h1 className="logo">React Forum</h1>
        </div>
      </div>
    );
  }
}
