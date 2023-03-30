import React, { useState, useEffect } from 'react';
import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import  api  from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from './ImagePopup.js';
import ConfirmationPopup from './ConfirmationPopup.js ';


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(null);

  /** Эффект при монтировании */
  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([data, items]) => {
            setCurrentUser(data);
            setCards(items);
        })
        .catch((error) => {
            console.log(error)
        })
}, []);

function handleCardLike(card) {
  // Снова проверяем, есть ли уже лайк на этой карточке
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  // Отправляем запрос в API и получаем обновлённые данные карточки
  if (!isLiked) {
    api.addLike(card._id).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    }).catch((error) => {
      console.error(error);
    });
  } else {
    api.deleteLike(card._id).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    }).catch((error) => {
      console.error(error);
    });
  };
};

function handleCardDelete(card) {
  api.deleteCard(card._id).then(() => {
    setCards((state) => state.filter((c) => c._id !== card._id && c));
  }).catch((error) => {
    console.error(error);
  });
};

function handleUpdateUser(items) {
  api
    .changeUserInfo(items)
    .then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    })
    .catch((error) => console.log(error));
};

function handleUpdateAvatar(items) {
  api.changeUserAvatar(items).then((data) => {
    setCurrentUser(data);
    closeAllPopups();
  }).catch((error) => {
    console.error(error);
  });
};

function handleAddPlaceSubmit(items) {
  api
    .addCard(items)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((error) => console.log(error));
};

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsConfirmationPopupOpen(null);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page__container">
      <Header />
      <Main
          onEditProfile={() => setIsEditProfilePopupOpen(true)}
          onAddPlace={() => setIsAddPlacePopupOpen(true)}
          onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
          onCardClick={(card) => setSelectedCard(card)}
          onCardLike = {handleCardLike}
          onConfirmCardDelete = {(card) => setIsConfirmationPopupOpen(card)}
          cards={cards}
        />
      <Footer />
      <PopupWithForm
        name="popup_profile"
        title="Редактировать&nbsp;профиль"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        textButton="Сохранить">
        <input
          className="popup__input popup__input_item_name"
          id="inputName"
          type="text"
          placeholder="Имя"
          name="inputName"
        />
        <span className="inputName-error popup__input-error"></span>
        <input
          className="popup__input popup__input_item_job"
          id="inputAbout"
          type="text"
          placeholder="О себе"
          name="inputAbout"
        />
        <span className="inputAbout-error popup__input-error"></span>
      </PopupWithForm>

      <PopupWithForm
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        name="popup_cards"
        title="Новое место"
        textButton="Создать">

        <input
          className="popup__input popup__input_item_name-mesto"
          id="inputNameCard"
          type="text"
          placeholder="Название"
          name="inputNameCard"
          required
        />
        <span className="inputNameCard-error popup__input-error"></span>
        <input
          className="popup__input popup__input_item_link"
          id="inputUrlCard"
          type="url"
          placeholder="Ссылка на картинку"
          name="inputUrlCard"
          pattern="https://.*"
          required
        />
        <span className="inputUrlCard-error popup__input-error"></span>
      </PopupWithForm>

      <PopupWithForm
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        name="popup_avatar"
        title="Обновить аватар"
        textButton="Сохранить">

        <input
          className="popup__input popup__input_link-avatar"
          id="inputAvatarName"
          type="url"
          name="inputAvatarName"
          placeholder="Ссылка на аватар"
          required
        />
        <span className="inputAvatarName-error popup__input-error"></span>
      </PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </div>
  );
}

export default App;
