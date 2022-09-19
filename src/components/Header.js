import React from "react";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import aroundLogoPath from "../images/around-logo.svg";

export default function Header(props) {
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const history = useHistory();

  function signOut() {
    props.setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    history.push("/signin");
  }

  function toggleDrawer() {
    setIsDrawerOpen(!isDrawerOpen);
  }

  function getScreenWidth() {
    setScreenWidth(window.innerWidth);
    if (screenWidth >= 750) {
      setIsDrawerOpen(false);
    }
  }

  React.useEffect(() => {
    window.addEventListener("resize", getScreenWidth);
    return () => window.removeEventListener("resize", getScreenWidth);
  });

  return (
    <Switch>
      <Route path="/signin">
        <header className="header">
          <div className="header__content">
            <img
              src={aroundLogoPath}
              alt="Around the us logo"
              className="logo"
            />
            <Link to="/signup" className="header__button">
              Sign Up
            </Link>
          </div>
        </header>
      </Route>
      <Route path="/signup">
        <header className="header">
          <div className="header__content">
            <img
              src={aroundLogoPath}
              alt="Around the us logo"
              className="logo"
            />
            <Link to="/signin" className="header__button">
              Sign In
            </Link>
          </div>
        </header>
      </Route>
      <Route path="/app">
        <header className="header">
          {isDrawerOpen && (
            <div className="header__drawer">
              <p className="header__email">{props.email}</p>
              <button
                onClick={signOut}
                className="header__button header__button_logged"
              >
                Sign Out
              </button>
            </div>
          )}
          <div className="header__content">
            <img
              src={aroundLogoPath}
              alt="Around the us logo"
              className="logo"
            />

            {screenWidth > 750 ? (
              <div className="header__container">
                <p className="header__email">{props.email}</p>
                <button
                  onClick={signOut}
                  className="header__button header__button_logged"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button onClick={toggleDrawer} className="header__drawer-icon">
                <div className="header__drawer-line"></div>
                <div className="header__drawer-line"></div>
                <div className="header__drawer-line"></div>
              </button>
            )}
          </div>
        </header>
      </Route>
    </Switch>
  );
}
