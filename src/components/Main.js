
import pen from '../images/pen.svg';
import buttonImage from '../images/Vector.svg';
import React, { useState, useEffect } from 'react';
import Card from './Card.js';
import api from '../utils/api.js';


function Main({ onEditProfile,
  onEditAvatar,
  onAddPlace,
  onCardClick
}) {

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([data, items]) => {
        setCurrentUser(data);
        setCards(items);
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__datablock">
          <div className="profile__avatar-block">
            <img src={currentUser.avatar} alt="Аватар" className="profile__avatar" />
            <button className="profile__edit-avatar" type="button" onClick={onEditAvatar}>
              <img src={pen} alt="изображение письменной ручки"
                className="profile__edit-pen" />
            </button>
          </div>
          <div clclassNameass="profile__info">
            <div className="profile__div">
              <h1 className="profile__name" name="profileTitle">{currentUser.name}</h1>
              <button className="profile__edit" type="button" aria-label="редактировать"
                name="profileButton" onClick={onEditProfile}>
              </button>
            </div>
            <p className="profile__about-me">{currentUser.about}</p>
          </div>
        </div>
        <button type="button" aria-label="добавить" className="profile__add-button"
          name="profileCardsAddButton" onClick={onAddPlace}>
          <img className="profile__button-image" src={buttonImage} alt="крестик на кнопке" />
        </button>
      </section>

      <section className="elements"> {
        cards.map((card) => {
          return (<Card
            card={card}
            key={card._id}
            name={card.name}
            link={card.link}
            likes={card.likes}
            onCardClick={onCardClick}
          />)
        })
      }
      </section>
    </main>
  );
}

export default Main;