import React from "react";
import useFormValidation from "../../hooks/formValidatorHook";

export default function AuthorizeForm(props) {
  const { values, handleChange, errors, isValid } = useFormValidation();

  function submitForm(evt) {
    evt.preventDefault();
    props.handleSubmit({ email: values.email, password: values.password });
  }

  return (
    <div className="authorize">
      <h2 className="authorize__title">{props.formTitle}</h2>
      <form onSubmit={submitForm} className="authorize__form">
        <fieldset className="authorize__fieldset">
          <input
            value={values.email || ""}
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required
            onChange={handleChange}
            className="authorize__input"
          ></input>
          {errors.email && (
            <span className="authorize__input-error">{errors.email}</span>
          )}
          <input
            value={values.password || ""}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
            onChange={handleChange}
            className="authorize__input"
          ></input>
          {errors.password && (
            <span className="authorize__input-error">{errors.pasword}</span>
          )}
          <button
            type="submit"
            id="authorize__submit"
            className={`authorize__submit ${
              isValid ? "" : "authorize__submit_disabled"
            }`}
            disabled={!isValid}
          >
            {props.formTitle}
          </button>
        </fieldset>
        <a href={props.redirectPath} className="authorize__redirect">
          {props.redirectText}
        </a>
      </form>
    </div>
  );
}
