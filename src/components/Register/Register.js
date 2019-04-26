import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { updateUser } from "../../ducks/reducer";
import { connect } from "react-redux";

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
      .then(user => {
        //update redux state with the new user
        //import the action creator
        //mapStateToProps
        //connect
        //Provider
        this.props.updateUser(user.data);
        this.setState({ redirect: true });
      });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/profile" />;
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
const mapStateToProps = reduxState => {
  return {
    user: reduxState.user
  };
};
export default connect(
  mapStateToProps,
  { updateUser }
)(Register);
