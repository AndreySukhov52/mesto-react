import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup(props) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    useEffect(() => {
        setName('');
        setLink('');
    }, [props.isOpen]);

    function handleUpdateName(evt) {
        setName(evt.target.value);
    };

    function handleUpdateLink(evt) {
        setLink(evt.target.value);
    };

    function handleSubmit(evt) {
        evt.preventDefault();

        props.onAddPlace({
            name,
            link,
        });
    };

    return (
        <PopupWithForm
            name="popup_cards"
            title="Новое место"
            textButton="Создать"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input
                className="popup__input popup__input_item_name-mesto"
                id="inputNameCard"
                type="text"
                placeholder="Название"
                name="inputNameCard"
                required
                onChange={handleUpdateName}
                value={name || ''}
            />
            <span className="inputNameCard-error popup__input-error" id="inputNameCard-error"></span>
            <input
                className="popup__input popup__input_item_link"
                id="inputUrlCard"
                type="url"
                placeholder="Ссылка на картинку"
                name="inputUrlCard"
                pattern="https://.*"
                required
                onChange={handleUpdateLink}
                value={link || ''}
            />
            <span className="inputUrlCard-error popup__input-error" id="inputUrlCard-error"></span>
        </PopupWithForm>
    );
};

export default AddPlacePopup;
