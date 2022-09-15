import React from "react";
import useFormValidation from "../../hooks/formValidatorHook";

export default function AuthorizeForm(props) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormValidation();

  return (
    <div className="authorize">
      <h2 className="authorize__title">{props.formTitle}</h2>
      <form className="authorize__form">
        <fieldset className="authorize__fieldset">
          <input
            value={values.email || ""}
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={handleChange}
            className="authorize__input"
          ></input>
          <input
            value={values.password || ""}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
            className="authorize__input"
          ></input>
          <button
            type="submit"
            id="authorize_submit"
            className="authorize__submit"
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
