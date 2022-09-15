import React from "react";
import success from "../../images/success.svg";
import failure from "../../images/failure.svg";

const imageSrc = require(`../../images/success.svg`);

export default function MessagePopup(props) {
  return (
    <div
      className={`message-popup popup ${
        props.isMessageOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <div className="popup__message-container">
          <button className="popup__close-button"></button>
          <img
            src={`${props.success ? success : failure}`}
            alt={`${
              props.success
                ? "register attempt was successful"
                : "register attempt failed"
            }`}
            className="popup__image"
          />
          <h2 className="popup__message">
            {props.success
              ? "Success! You have now been registered"
              : "failure"}
          </h2>
        </div>
      </div>
    </div>
  );
}
