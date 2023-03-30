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
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(null)


  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([data, items]) => {
            setCurrentUser(data);
            setCards(items);
        })
        .catch((err) => {
            console.log(err)
        })
}, []);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <div className="page__container">
      <Header />
      <Main
        onEditProfile={() => setIsEditProfilePopupOpen(true)}
        onAddPlace={() => setIsAddPlacePopupOpen(true)}
        onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
        onCardClick={(card) => setSelectedCard(card)}
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
