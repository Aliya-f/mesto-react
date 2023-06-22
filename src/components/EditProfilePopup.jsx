import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
	// Подписка на контекст
	const currentUser = React.useContext(CurrentUserContext);
  // Стейты, в которых содержится значение инпута
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

	// После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах.
	React.useEffect(() => {
  setName(currentUser.name);
  setDescription(currentUser.about);
	}, [currentUser]); 

  // Обработчик изменения инпута обновляет стейт
  function handleChangeName(evt) {
    setName(evt.target.value);
  }
  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

	function handleSubmit(e) {
		// Запрещаем браузеру переходить по адресу формы
		e.preventDefault();
		// Передаём значения управляемых компонентов во внешний обработчик
		onUpdateUser({
			name,
			about: description,
		});
	} 

  return (
    <PopupWithForm classText="title" title="Редактировать профиль" 
    name="profile" 
    buttonText="Сохранить"
    isOpen={isOpen}
    onClose={onClose}
		onSubmit={handleSubmit}
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
      onChange={handleChangeName}
      value={name || ''}
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
      onChange={handleChangeDescription}
      value={description || ''}
      />
      <span className="popup__error-visible" id="about-error" />
    </PopupWithForm> 
  )      
}