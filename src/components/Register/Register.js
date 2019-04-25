import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

export class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      email: "",
      redirect: false
    };
  }

  handleUsername = e => {
    this.setState({ username: e.target.value });
  };

  handlePassword = e => {
    this.setState({ password: e.target.value });
  };

  handleEmail = e => {
    this.setState({ email: e.target.value });
  };

  handleClick = () => {
    const { username, password, email } = this.state;
    axios
      .post("/api/register", {
        username,
        password,
        email
      })
      .then(res => {
        this.setState({ redirect: true });
      });
  };

  render() {
      if(this.state.redirect) {
          return <Redirect to='/'/>
      }
    return (
      <div>
        Register
        <br />
        <input onChange={this.handleUsername} placeholder="Username" />
        <br />
        <input
          type="password"
          onChange={this.handlePassword}
          placeholder="Password"
        />
        <br />
        <input onChange={this.handleEmail} placeholder="Email" />
        <br />
        <button onClick={this.handleClick}>Register</button>
      </div>
    );
  }
}

export default Register;
