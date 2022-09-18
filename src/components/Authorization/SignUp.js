import React from "react";
import { useHistory } from "react-router-dom";
import AuthorizeForm from "./AuthorizeForm";

export default function SignUp(props) {
  const history = useHistory();
  function handleSubmit(values) {
    props
      .submitRequest(values)
      .then(() => {
        props.openMessagePopup(true);
        props.setMessagePopupSuccess(true);
        history.push("/signin");
      })
      .catch((err) => {
        props.authErrorReport(err);
        props.openMessagePopup(true);
        props.setIsMessagePopupSuccess(false);
      });
  }

  return (
    <AuthorizeForm
      formTitle="Sign Up"
      redirectText="Already a member? Log in here!"
      redirectPath="/signin"
      handleSubmit={handleSubmit}
    />
  );
}
