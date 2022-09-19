import React from "react";
import { useHistory } from "react-router-dom";
import AuthorizeForm from "./AuthorizeForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function SignIn(props) {
  const history = useHistory();
  const currentUser = React.useContext(CurrentUserContext);

  function handleSubmit({ email, password }) {
    props
      .submitRequest({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        props.setIsLoggedIn(true);
        props.setEmail(email);
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
