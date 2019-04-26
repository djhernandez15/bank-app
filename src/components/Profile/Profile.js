import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
//if a user off session was received, then we want to allow them to see the page, otherwise, we want to redirect them back to Login page
//import connect
//mapStateToProps

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false
    };
  }

  componentDidMount() {
    console.log(this.props);
    if (!this.props.user.username) {
      this.setState({ redirect: true });
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return <div>Profile</div>;
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  };
};
export default connect(mapStateToProps)(Profile);
