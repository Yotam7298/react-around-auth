import React from "react";
import AuthorizeForm from "./AuthorizeForm";

export default function SignUp(props) {
  function handleSubmit(values) {
    props
      .submitRequest(values)
      .then(() => {
        props.openMessagePopup(true);
        props.setMessagePopupSuccess(true);
      })
      .catch((errStatus) => {
        console.log((errStatus) => {
          switch (errStatus) {
            case 400:
              console.log(
                `Error 400 - One of the fields was filled in incorrectly`
              );
              break;
            default:
              console.log(`Error 500 - Something went wwrong with the server`);
              break;
          }
        });
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
