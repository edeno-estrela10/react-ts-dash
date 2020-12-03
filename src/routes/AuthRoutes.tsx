import React from "react";
import { Redirect, Route } from "react-router-dom";

import Login from "../pages/Login";

export const AuthRoutes: React.FC = () => {
  return (
    <>
      <Route path="/login" component={Login} />
      <Redirect to={{ pathname: "/login" }} />
    </>
  );
};
