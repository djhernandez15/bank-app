import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      redirect: false
    };
  }

  handleUsername = e => {
    this.setState({ username: e.target.value });
  };

  handlePassword = e => {
    this.setState({ password: e.target.value });
  };

  handleClick = e => {
    const { username, password } = this.state;
    axios.post("/api/login", { username, password }).then(res => {
      this.setState({ redirect: true });
    });
  };

  handleEnter = e => {
    if (e.key === "Enter") {
      this.handleClick();
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/profile" />;
    }
    return (
      <div>
        Login
        <br />
        <input onChange={this.handleUsername} placeholder="Username" />
        <br />
        <input
          type="password"
          onChange={this.handlePassword}
          placeholder="Password"
          onKeyPress={this.handleEnter}
        />
        <br />
        <button onClick={this.handleClick}>Log In</button>
        <h3>
          Don't have an account? <Link to="register">Register</Link> Today!
        </h3>
      </div>
    );
  }
}

export default Login;
