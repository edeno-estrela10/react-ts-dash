import React, { FC } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"; //

import { CssBaseline } from "@material-ui/core";

import { useUserState } from "../contexts";
import { AppRoutes } from "./AppRoutes";
import { AuthRoutes } from "./AuthRoutes";

const PrivateRoute: FC<any> = ({ component, ...rest }) => {
  const { isAuthenticated } = useUserState();
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          React.createElement(component, props)
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                from: props.location,
              },
            }}
          />
        )
      }
    />
  );
};

const PublicRoute: FC<any> = ({ component, ...rest }) => {
  const { isAuthenticated } = useUserState();
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        ) : (
          React.createElement(component, props)
        )
      }
    />
  );
};
const Routes: FC = () => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />
        <Route
          exact
          path="/app"
          render={() => <Redirect to="/app/dashboard" />}
        />
        <PrivateRoute path="/app" component={AppRoutes} />
        <PublicRoute path="/login" component={AuthRoutes} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
