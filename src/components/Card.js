import React from 'react';

function Card({ card, name, link, likes, onCardClick }) {

  function handleCardClick() {
    onCardClick(card);
  }

  return (
    <figure className="element">
      <button className="element__delete" type="button" aria-label="удалить"></button>
      <img onClick={handleCardClick} className="element__image" src={link} alt={name} />
      <figcaption className="element__caption">
        <h2 className="element__text">{name}</h2>
        <div className="element__container-like">
          <button className="element__like" type="button" aria-label="лайк"></button>
          <p className="element__count-like">{likes.length}</p>
        </div>
      </figcaption>
    </figure>
  )
}

export default Card;

