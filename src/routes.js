import React from "react";
import { Switch, Route } from "react-router-dom";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";

export default (
  <Switch>
    <Route path="/register" component={Register} />
    <Route path="/" component={Login} />
  </Switch>
);
