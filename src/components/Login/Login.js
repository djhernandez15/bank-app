import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { styled } from "baseui";
import { StatefulInput } from "baseui/input";
import { Button, KIND } from "baseui/button";
import { Block } from "baseui/block";
import { LightTheme, ThemeProvider } from "baseui";

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
      <ThemeProvider theme={LightTheme}>
        <div>
          Login
          <br />
          <StatefulInput
            onChange={this.handleUsername}
            placeholder="Username"
          />
          <br />
          <StatefulInput
            type="password"
            onChange={this.handlePassword}
            placeholder="Password"
            onKeyPress={this.handleEnter}
          />
          <br />
          <Button onClick={this.handleClick}>Log In</Button>
          <Block as="span" marginLeft="scale300" />
          {/* <button onClick={this.handleClick}>Log In</button> */}
          <h3>
            Don't have an account? <Link to="register">Register</Link> Today!
          </h3>
        </div>
      </ThemeProvider>
    );
  }
}

export default Login;
