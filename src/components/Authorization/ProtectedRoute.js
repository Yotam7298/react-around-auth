import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute({ children, isLoggedIn, ...props }) {
  return (
    <Route {...props}>
      {isLoggedIn ? children : <Redirect to={"/signin"} />}
    </Route>
  );
}
