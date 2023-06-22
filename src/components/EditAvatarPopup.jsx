import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
	const avatarRef = React.useRef();

	function handleSubmit(e) {
		e.preventDefault();
		onUpdateAvatar({
			avatar: avatarRef.current.value
		});
		avatarRef.current.value = '';
	}

	return (
		<PopupWithForm classText="title" title="Обновить аватар" 
		name="avatar" 
		buttonText="Сохранить"
		isOpen={isOpen}
		onClose={onClose}
		onSubmit={handleSubmit}>
			<input 
      type="url" 
      placeholder="Ссылка на фото"
      className="popup__form-input" 
      name="avatar" 
      id="avatar" 
      required="" 
      minLength={2} maxLength={200}
			ref={avatarRef}
      />
      <span className="popup__error-visible"
      id="avatar-error" />
    </PopupWithForm> 
	)
}
