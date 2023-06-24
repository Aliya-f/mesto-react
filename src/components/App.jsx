import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import {api} from "../utils/Api.js";
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';

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
  function handleCardLike({likes, _id}) {
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
      .getInitialCards()
      .then((res) => {
        setCards([...res]);
      })
      .catch((err) => console.log(err));
  }, []);

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

	function handleUpdateAvatar(data) {
		api
    .setAvatar(data)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => console.log(err))
  }

	function handleAddPlaceSubmit(data) {
		api
    .createCard(data)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => console.log(err))
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
				<EditAvatarPopup
					isOpen={isEditAvatarPopupOpen}
					onClose={closeAllPopups}
					onUpdateAvatar={handleUpdateAvatar} /> 
        {/* POPUP: Редактировать профиль */}
				<EditProfilePopup
					isOpen={isEditProfilePopupOpen}
					onClose={closeAllPopups}
					onUpdateUser={handleUpdateUser}
				/> 
        {/* POPUP: добавить фото */}
				<AddPlacePopup
					isOpen={isAddPlacePopupOpen}
					onClose={closeAllPopups}
					onAddPlace={handleAddPlaceSubmit}
				/>        
        {/* POPUP: Удалить карточку */}
        <PopupWithForm
					classText="title"
					title="Вы уверены?" 
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
