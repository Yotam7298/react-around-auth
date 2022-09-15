import React from "react";
import AuthorizeForm from "./AuthorizeForm";

export default function SignUp() {
  return (
    <AuthorizeForm
      formTitle="Sign Up"
      redirectText="Already a member? Log in here!"
      redirectPath="/signin"
    />
  );
}
