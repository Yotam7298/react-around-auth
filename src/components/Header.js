import React, { useEffect, useState } from "react";
import aroundLogoPath from "../images/around-logo.svg";
import LoggedInContext from "../contexts/LoggedInContext";

export default function Header() {
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const isLoggedIn = React.useContext(LoggedInContext);

  function toggleDrawer() {
    setIsDrawerOpen(!isDrawerOpen);
  }

  function getScreenWidth() {
    setScreenWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", getScreenWidth);
    return () => window.removeEventListener("resize", getScreenWidth);
  });

  let headerPath = window.location.pathname;

  switch (headerPath) {
    case "/signin":
      headerPath = {
        link: "/signup",
        text: "Sign Up",
      };
      break;
    case "/signup":
      headerPath = { link: "/signin", text: "Sign In" };
      break;
    default:
      headerPath = {
        email: "email@email.com",
        link: "/signin",
        text: "Sign Out",
      };
      break;
  }

  return (
    <header className="header">
      {isDrawerOpen && (
        <div className="header__drawer">
          <p className="header__email">{headerPath.email}</p>
          <a
            href={headerPath.link}
            className="header__button header__button_logged"
          >
            {headerPath.text}
          </a>
        </div>
      )}
      <div className="header__content">
        <img src={aroundLogoPath} alt="Around the us logo" className="logo" />

        {isLoggedIn ? (
          screenWidth > 600 ? (
            <div className="header__container">
              <p className="header__email">{headerPath.email}</p>
              <a
                href={headerPath.link}
                className="header__button header__button_logged"
              >
                {headerPath.text}
              </a>
            </div>
          ) : (
            <button onClick={toggleDrawer} className="header__drawer-icon">
              <div className="header__drawer-line"></div>
              <div className="header__drawer-line"></div>
              <div className="header__drawer-line"></div>
            </button>
          )
        ) : (
          <a href={headerPath.link} className="header__button">
            {headerPath.text}
          </a>
        )}
      </div>
    </header>
  );
}
