import React from "react";
import { Switch, Route } from "react-router-dom";
import { Login } from "./components/Login/Login";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";

export default (
  <Switch>
    <Route path="/register" component={Register} />
    <Route path="/profile" component={Profile} />
    <Route path="/" component={Login} />
  </Switch>
);
