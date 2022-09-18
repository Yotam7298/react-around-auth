import React from "react";
import { useHistory } from "react-router-dom";
import AuthorizeForm from "./AuthorizeForm";

export default function SignIn(props) {
  const history = useHistory();

  function handleSubmit({ email, password }) {
    props
      .submitRequest({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        props.setIsLoggedIn(true);
        history.push("/app");
      })
      .catch((err) => {
        props.authErrorReport(err);
      });
  }

  return (
    <AuthorizeForm
      formTitle="Log In"
      redirectPath="/signup"
      redirectText="Not a member yet? Sign up here!"
      handleSubmit={handleSubmit}
    />
  );
}
