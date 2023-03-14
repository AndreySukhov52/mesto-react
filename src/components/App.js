//import logo from './logo.svg';
//import './App.css';

function App() {
  return (
    <div className="page__container">
    <header className="header">
      <img src="<%=require('./images/logo.svg')%>" alt="Логотип Место" className="header__logo"/>
    </header>
    <main className="content">
      <section className="profile">
        <div className="profile__datablock">
          <div className="profile__avatar-block">
            <img src="<%=require('./images/avatar.jpg')%>" alt="Аватар" className="profile__avatar"/>
            <button className="profile__edit-avatar" type="button">
              <img src="<%=require('./images/pen.svg')%>" alt="изображение письменной ручки"
                className="profile__edit-pen"/>
            </button>
          </div>
          <div clclassNameass="profile__info">
            <div className="profile__div">
              <h1 className="profile__name">Жак-Ив Кусто</h1>
              <button className="profile__edit" type="button" aria-label="редактировать"></button>
            </div>
            <p className="profile__about-me">Исследователь океана</p>
          </div>
        </div>
        <button type="button" aria-label="добавить" className="profile__add-button">
          <img className="profile__button-image" src="<%=require('./images/Vector.svg')%>" alt="крестик на кнопке" />
        </button>
      </section>

      <section className="elements">
      </section>
    </main>
    <footer className="footer">
      <p className="footer__text">© 2022 Mesto Russia</p>
    </footer>

    <div className="popup popup_profile">
      <div className="popup__container">
        <button type="button" aria-label="закрыть" className="popup__close popup__close_button_profile"
          name="close_editprofile"></button>
        <h2 className="popup__title">Редактировать профиль</h2>
        <form className="popup__form" action="#" name="user_profile" novalidate>
          <input className="popup__input popup__input_item_name" name="inputName" id="inputName" type="text" value="" minlength="2"
            maxlength="40" required />
          <span className="inputName-error popup__input-error"></span>
          <input className="popup__input popup__input_item_job" name="inputAbout" id="inputAbout" type="text" value="" minlength="2"
            maxlength="200" required />
          <span className="inputAbout-error popup__input-error"></span>
          <button className="popup__button popup__button_submit_saveprofile" type="submit" aria-label="сохранить">
            Сохранить
          </button>
        </form>
      </div>
    </div>

    <div className="popup popup_cards">
      <div className="popup__container">
        <button type="button" aria-label="закрыть" class="popup__close popup__close_button_cards"></button>
        <h2 className="popup__title">Новое место</h2>
        <form className="popup__form popup__form-add" action="#" name="add_cards" novalidate>
          <input className="popup__input popup__input_item_name-mesto" name="inputNameCard" id="inputNameCard" type="text" value=""
            placeholder="Название" minlength="2" maxlength="30" required />
          <span className="inputNameCard-error popup__input-error"></span>
          <input className="popup__input popup__input_item_link" name="inputUrlCard" id="inputUrlCard" type="url" value=""
            placeholder="Ссылка на картинку" required />
          <span className="inputUrlCard-error popup__input-error"></span>
          <button className="popup__button popup__button_submit_addcard" type="submit" name="submitButton" aria-label="Создать">
            Создать
          </button>
        </form>
      </div>
    </div>

    <div className="popup popup_type_update-avatar">
      <div className="popup__container">
        <button className="popup__close" aria-label="закрыть" type="button"></button>
        <h2 className="popup__title">Обновить аватар</h2>
        <form className="popup__form popup__form-avatar" name="editAvatarForm" id="editAvatarForm" novalidate>
          <input className="popup__input popup__input_link-avatar" name="inputAvatarName" id="inputAvatarName" type="url"
            placeholder="Введите ссылку URL" required/>
          <span className="inputAvatarName-error popup__input-error"></span>
          <button className="popup__button" type="submit">Сохранить</button>
        </form>
      </div>
    </div>

    <div className="popup popup_type_confirmation">
      <div className="popup__container">
        <button className="popup__close" aria-label="закрыть" type="button"></button>
        <h2 className="popup__title">Вы уверены?</h2>
        <form className="popup__form">
          <button className="popup__button" type="submit">Да</button>
        </form>
      </div>
    </div>

    <div className="popup popup_photofull">
      <figure className="popup__container-photofull">
        <button type="button" aria-label="закрыть" className="popup__close popup__close_button_open-card"></button>
        <img className="popup__fullscreen" src="#" alt="Фото место"/>
        <h2 className="popup__title-mesto"></h2>
      </figure>
    </div>
  </div>
  );
}

export default App;
