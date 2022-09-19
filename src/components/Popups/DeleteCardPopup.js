import React from "react";
import PopupWithForm from "./PopupWithForm";
import LoadingFormContext from "../../contexts/LoadingFormContext";

export default function DeleteCardPopup(props) {
  const isLoading = React.useContext(LoadingFormContext);

  function submitDeleteCardForm(evt) {
    evt.preventDefault();
    props.setLoadingState(true);
    props.formSubmit();
  }

  return (
    <PopupWithForm
      name="delete"
      title="Are You Sure?"
      isOpen={props.deletedCard}
      isFormValid={true}
      onSubmit={submitDeleteCardForm}
      onClose={props.onClose}
      submitText={isLoading ? "Deleting..." : "Yes"}
    />
  );
}
