//React imports
import React from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
//Components Imports
import Header from "./Header";
import SignUp from "./Authorization/SignUp";
import SignIn from "./Authorization/SignIn";
import Main from "./Main";
import Footer from "./Footer";
//Popups imports
import EditProfilePopup from "./Popups/EditProfilePopup";
import EditAvatarPopup from "./Popups/EditAvatarPopup";
import AddCardPopup from "./Popups/AddPlacePopup";
import DeleteCardPopup from "./Popups/DeleteCardPopup";
import ImagePopup from "./Popups/ImagePopup";
import MessagePopup from "./Popups/MessagePopup";
//Contexts imports
import CurrentUserContext from "../contexts/CurrentUserContext";
import CardsContext from "../contexts/CardsContext";
import LoadingFormContext from "../contexts/LoadingFormContext";
import LoggedInContext from "../contexts/LoggedInContext";
//API import
import api from "../utils/api";
import auth from "../utils/auth";
//CSS import
import "../index.css";
import ProtectedRoute from "./Authorization/ProtectedRoute";

function App() {
  const history = useHistory();
  //STATE VARIABLES
  //Popups toggles
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = React.useState(false);
  const [isMessagePopupOpen, setIsMessagePopupOpen] = React.useState(false);
  const [isMessagePopupSuccess, setIsMessagePopupSuccess] =
    React.useState(false);
  //Card selectors
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [deletedCard, setDeletedCard] = React.useState(null);
  //Server data
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [email, setEmail] = React.useState("");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  //FUNCTIONS
  //Popup opening handlers
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddCardPopupOpen(true);
  }

  //Popup closing handler
  function closeAllPopups() {
    setIsAddCardPopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsMessagePopupOpen(false);
    setSelectedCard(null);
    setDeletedCard(null);
  }

  //Submits
  function addCardSubmit(input) {
    api
      .addNewCard(input)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => api.reportError(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function deleteCardSubmit() {
    api
      .deleteCard(deletedCard._id)
      .then(() => {
        setCards(cards.filter((card) => card._id !== deletedCard._id));
        closeAllPopups();
      })
      .catch((err) => api.reportError(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function editAvatarSubmit(avatar) {
    api
      .editProfileAvatar(avatar)
      .then((userInfo) => {
        setCurrentUser({ ...currentUser, avatar: userInfo.avatar });
        closeAllPopups();
      })
      .catch((err) => api.reportError(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function editProfileSubmit(input) {
    api
      .editProfileInfo(input)
      .then((userInfo) => {
        setCurrentUser({
          ...currentUser,
          name: userInfo.name,
          about: userInfo.about,
        });
        closeAllPopups();
      })
      .catch((err) => api.reportError(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleLike(cardId, method) {
    api
      .changeCardLike(cardId, method)
      .then((newCard) => {
        setCards((state) =>
          state.map((card) => (card._id === newCard._id ? newCard : card))
        );
      })
      .catch((err) => api.reportError(err));
  }

  React.useEffect(() => {
    api
      .getAllInfo()
      .then(([userInfo, cards]) => {
        setCurrentUser({
          ...currentUser,
          name: userInfo.name,
          about: userInfo.about,
          avatar: userInfo.avatar,
          id: userInfo._id,
        });
        setCards(cards);
      })
      .catch((err) => api.reportError(err));
  }, []);

  React.useEffect(() => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      auth
        .getMyInfo(jwt)
        .then((res) => {
          setEmail(res.data.email);
          setIsLoggedIn(true);
        })
        .then(() => {
          history.push("/app");
          console.log(email);
        })
        .catch((err) => auth.reportError(err));
    }
  }, []);

  React.useEffect(() => {
    const closeByEscape = (evt) => {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    };

    document.addEventListener("keydown", closeByEscape);

    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardsContext.Provider value={cards}>
        <LoadingFormContext.Provider value={isLoading}>
          <LoggedInContext.Provider value={isLoggedIn}>
            <div className="page">
              {/* Main page content */}
              <MessagePopup
                isMessageOpen={isMessagePopupOpen}
                success={isMessagePopupSuccess}
                onClose={closeAllPopups}
              />
              <Header setIsLoggedIn={setIsLoggedIn} email={email} />
              <Switch>
                <Route path="/signup">
                  <SignUp
                    submitRequest={auth.signUpUser.bind(auth)}
                    authErrorReport={auth.reportError.bind(auth)}
                    openMessagePopup={setIsMessagePopupOpen}
                    setIsMessagePopupSuccess={setIsMessagePopupSuccess}
                  />
                </Route>
                <Route path="/signin">
                  <SignIn
                    submitRequest={auth.signInUser.bind(auth)}
                    authErrorReport={auth.reportError.bind(auth)}
                    setIsLoggedIn={setIsLoggedIn}
                    setEmail={setEmail}
                  />
                </Route>
                <ProtectedRoute path="/app">
                  <Main
                    onEditProfileClick={handleEditProfileClick}
                    onAddPlaceClick={handleAddPlaceClick}
                    onEditAvatarClick={handleEditAvatarClick}
                    onCardClick={setSelectedCard}
                    onCardDelete={setDeletedCard}
                    handleLike={handleLike}
                  />
                  <Footer />

                  {/* Popups */}
                  <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    setLoadingState={setIsLoading}
                    formSubmit={editProfileSubmit}
                  />
                  <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    setLoadingState={setIsLoading}
                    formSubmit={editAvatarSubmit}
                  />
                  <AddCardPopup
                    isOpen={isAddCardPopupOpen}
                    setLoadingState={setIsLoading}
                    onClose={closeAllPopups}
                    formSubmit={addCardSubmit}
                  />
                  <DeleteCardPopup
                    deletedCard={deletedCard}
                    onClose={closeAllPopups}
                    setLoadingState={setIsLoading}
                    formSubmit={deleteCardSubmit}
                  />
                  <ImagePopup
                    name="image"
                    card={selectedCard}
                    onClose={closeAllPopups}
                  />
                </ProtectedRoute>
                <Route path="/">
                  {isLoggedIn ? (
                    <Redirect to="/app" />
                  ) : (
                    <Redirect to="/signin" />
                  )}
                </Route>
              </Switch>
            </div>
          </LoggedInContext.Provider>
        </LoadingFormContext.Provider>
      </CardsContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
