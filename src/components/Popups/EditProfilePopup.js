import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import LoadingFormContext from "../../contexts/LoadingFormContext";
import useFormValidation from "../../hooks/formValidatorHook";

export default function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isLoading = React.useContext(LoadingFormContext);
  const {
    values,
    handleChange,
    errors,
    isValid,
    setValues,
    setIsValid,
    resetForm,
  } = useFormValidation();

  function submitEditProfileForm(evt) {
    evt.preventDefault();
    props.setLoadingState(true);
    props.formSubmit({
      name: values.name,
      about: values.about,
    });
  }

  React.useEffect(() => {
    resetForm();
    setValues({ ...values, name: currentUser.name, about: currentUser.about });
    setIsValid(true);
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm
      name="edit"
      title="Edit Profile"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={submitEditProfileForm}
      isFormValid={isValid}
      submitText={isLoading ? "Saving..." : "Save"}
    >
      <input
        value={values.name || ""}
        type="text"
        name="name"
        id="name-input"
        placeholder="Name"
        minLength="2"
        maxLength="40"
        required
        className={`form__input ${errors.name && "form__input_invalid"}`}
        onChange={handleChange}
      />
      {errors.name && (
        <span className="name-input-error form__input-error">
          {errors.name}
        </span>
      )}
      <input
        value={values.about || ""}
        type="text"
        name="about"
        id="about-input"
        placeholder="About me"
        minLength="2"
        maxLength="200"
        required
        className={`form__input ${errors.about && "form__input_invalid"}`}
        onChange={handleChange}
      />
      {errors.about && (
        <span className="about-input-error form__input-error">
          {errors.about}
        </span>
      )}
    </PopupWithForm>
  );
}
