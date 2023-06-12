import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  } 
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }
  function handleCardClick(card){
    setSelectedCard(card);
  }

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  return (
    <div className="page">
      <Header />
      <Main
      onEditAvatar={handleEditAvatarClick}
      onEditProfile={handleEditProfileClick}
      onAddPlace={handleAddPlaceClick}
      onCardClick={handleCardClick}
      />
      <Footer />
      {/* POPUP: Сменить аватар */}
      <PopupWithForm classText="title" title="Обновить аватар" 
      name="avatar" 
      buttonText="Сохранить"
      isOpen={isEditAvatarPopupOpen}
      onClose={closeAllPopups}      
      > 
        <input 
        type="url" 
        placeholder="Ссылка на фото"
        className="popup__form-input" 
        name="avatar" 
        id="avatar" 
        required="" 
        minLength={2} maxLength={200}
        />
        <span className="popup__error-visible"
        id="avatar-error" />
      </PopupWithForm> 
      {/* POPUP: Редактировать профиль */}
      <PopupWithForm classText="title" title="Редактировать профиль" 
      name="profile" 
      buttonText="Сохранить"
      isOpen={isEditProfilePopupOpen}
      onClose={closeAllPopups}
      > 
        <input
        type="text"
        placeholder="Имя"
        className="popup__form-input"
        name="name"
        id="name"
        required=""
        minLength={2}
        maxLength={40}
        />
        <span className="popup__error-visible" id="name-error" />
        <input
        type="text"
        placeholder="О себе"
        className="popup__form-input"
        name="about"
        id="about"
        required=""
        minLength={2}
        maxLength={200}
        />
        <span className="popup__error-visible" id="about-error" />
      </PopupWithForm> 
      {/* POPUP: добавить фото */}
      <PopupWithForm classText="title" title="Новое место" 
      name="cards" 
      buttonText="Создать"
      isOpen={isAddPlacePopupOpen}
      onClose={closeAllPopups}
      >  
        <input
        type="text"
        placeholder="Название"
        className="popup__form-input"
        name="name"
        id="place"
        required=""
        minLength={2}
        maxLength={40}
        />
        <span className="popup__error-visible" id="place-error" />
        <input
        type="url"
        placeholder="Ссылка на картинку"
        className="popup__form-input"
        name="link"
        id="link"
        required=""
        minLength={2}
        />
        <span className="popup__error-visible" id="link-error" />
      </PopupWithForm>
      {/* POPUP: Удалить карточку */}
      <PopupWithForm classText="title" title="Вы уверены?" 
      name="delete-card" 
      buttonText="Да"
      isOpen={false}
      onClose={closeAllPopups}/> 
      {/* POPUP: открыть карточку */}
      <ImagePopup
        card={selectedCard} 
        onClose={closeAllPopups} 
      />
    </div>
  );
}

export default App;
