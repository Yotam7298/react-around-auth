import React from "react";
import AuthorizeForm from "./AuthorizeForm";

export default function SignUp() {
  console.log(window.location.pathname);

  return (
    <AuthorizeForm
      formTitle="Sign Up"
      redirectText="Already a member? Log in here!"
      redirectPath="/signin"
    />
  );
}
