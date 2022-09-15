import React from "react";
import { Route, Redirect } from "react-router-dom";
import LoggedInContext from "../../contexts/LoggedInContext";

export default function ProtectedRoute({ children, ...props }) {
  const isLoggedIn = React.useContext(LoggedInContext);
  return (
    <Route {...props}>
      {isLoggedIn ? children : <Redirect to={"/signin"} />}
    </Route>
  );
}
