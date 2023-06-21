import React from 'react';
//import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import {api} from "../utils/Api.js";
import EditProfilePopup from './EditProfilePopup';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

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
  function handleCardDelete(id) {
    api
    .deleteCard(id)
    .then(() => setCards((state) => state.filter((item) => item._id !== id)))
    .catch((err) => console.log(err))
  }
  function handleCardLike(likes, _id) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(_id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === _id ? newCard : c));
    })
    .catch((err) => console.log(err));
  } 

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data)
      })
      .catch((err) => console.log(err));
  }, []);

	function handleUpdateUser(data) {
		api.setUserInfo(data)
		.then((res) => {
			setCurrentUser(res);
      closeAllPopups()
		})
		.catch((err) => console.log(err));
	}

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        onCardDelete={handleCardDelete}
        onCardLike={handleCardLike}
        cards={cards}
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
        <EditProfilePopup isOpen={isEditProfilePopupOpen}
				onClose={closeAllPopups}
				onUpdateUser={handleUpdateUser}
				/> 
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
    </CurrentUserContext.Provider>
  );
}

export default App;
