import React from "react";
import AuthorizeForm from "./AuthorizeForm";

export default function SignIn(props) {
  return (
    <AuthorizeForm
      formTitle="Log In"
      redirectText="Not a member yet? Sign up here!"
    />
  );
}