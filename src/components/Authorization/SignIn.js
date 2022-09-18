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
      .catch((errStatus) => {
        switch (errStatus) {
          case 400:
            console.log(
              `Error 400 - One or more of the fields were not provided`
            );
            break;
          case 401:
            console.log(
              `Error 401 - The user with the specified email not found`
            );
          default:
            console.log(`Error 500 - Something went wrong with the server`);
            break;
        }
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
