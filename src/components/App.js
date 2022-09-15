//React imports
import React from "react";
import { Route, Switch } from "react-router-dom";
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
//API import
import api from "../utils/api";
//CSS import
import "../index.css";

function App() {
  //STATE VARIABLES
  //Popups toggles
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = React.useState(false);
  //Card selectors
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [deletedCard, setDeletedCard] = React.useState(null);
  //Server data
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});

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
    setSelectedCard(null);
    setDeletedCard(null);
  }

  //Popup submit handlers

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
          <Switch>
            <div className="page">
              {/* Main page content */}
              <MessagePopup isMessageOpen={true} success={true} />
              <Header />
              <Route path="/signup">
                <SignUp />
              </Route>
              <Route path="/signin">
                <SignIn />
              </Route>

              <Main
                onEditProfileClick={handleEditProfileClick}
                onAddPlaceClick={handleAddPlaceClick}
                onEditAvatarClick={handleEditAvatarClick}
                onCardClick={setSelectedCard}
                onCardDelete={setDeletedCard}
                updateCards={setCards}
                likeRequest={api.changeCardLike.bind(api)}
                cardsRequest={api.loadCards.bind(api)}
                requestError={api.reportError.bind(api)}
              />
              <Footer />

              {/* Popups */}
              <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                updateUser={setCurrentUser}
                setLoadingState={setIsLoading}
                submitRequest={api.editProfileInfo.bind(api)}
                requestError={api.reportError.bind(api)}
              />
              <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                updateUser={setCurrentUser}
                updateCards={setCards}
                setLoadingState={setIsLoading}
                submitRequest={api.editProfileAvatar.bind(api)}
                requestError={api.reportError.bind(api)}
              />
              <AddCardPopup
                isOpen={isAddCardPopupOpen}
                onClose={closeAllPopups}
                updateCards={setCards}
                setLoadingState={setIsLoading}
                submitRequest={api.addNewCard.bind(api)}
                requestError={api.reportError.bind(api)}
              />
              <DeleteCardPopup
                deletedCard={deletedCard}
                onClose={closeAllPopups}
                updateCards={setCards}
                setLoadingState={setIsLoading}
                submitRequest={api.deleteCard.bind(api)}
                requestError={api.reportError.bind(api)}
              />
              <ImagePopup
                name="image"
                card={selectedCard}
                onClose={closeAllPopups}
              />
            </div>
          </Switch>
        </LoadingFormContext.Provider>
      </CardsContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
