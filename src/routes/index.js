import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { isAuthenticated } from "../services/auth";

import Home from "../pages/Home";
import Card from "../pages/Card";
import Login from "../pages/Login";
import Register from "../pages/Register";

export default function Routes() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route
          path="/register"
          render={() =>
            !isAuthenticated() ? <Register /> : <Redirect to="/" />
          }
        />
        <Route
          path="/login"
          render={() => (!isAuthenticated() ? <Login /> : <Redirect to="/" />)}
        />
        <Route
          path="/cadastro"
          render={() =>
            isAuthenticated() ? <Card /> : <Redirect to="/login" />
          }
        />
        <Route
          path="/"
          render={() =>
            isAuthenticated() ? <Home /> : <Redirect to="/login" />
          }
        />
      </Switch>
    </Router>
  );
}
