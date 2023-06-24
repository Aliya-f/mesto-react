import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
	const [name, setName] = React.useState('');
	const [link, setLink] = React.useState('');

	React.useEffect(() => {
		setName('');
		setLink('');
	}, [isOpen]);

  // Обработчик изменения инпута обновляет стейт
  function handleChangeName(evt) {
    setName(evt.target.value);
  }
  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }

	function handleSubmit(e) {
		// Запрещаем браузеру переходить по адресу формы
		e.preventDefault();
		// Передаём значения управляемых компонентов во внешний обработчик
		onAddPlace({
			name: name,
			link: link,
		});
	}

	return (
		<PopupWithForm
			classText="title"
			title="Новое место" 
    	name="cards" 
	    buttonText="Создать"
  	  isOpen={isOpen}
    	onClose={onClose}
			onSubmit={handleSubmit}
    >
      <input
				type="text"
  	    placeholder="Название"
    	  className="popup__form-input"
      	name="name"
	      id="place"
  	    required
    	  minLength={2}
      	maxLength={40}
				onChange={handleChangeName}
				value={name}
      />
      <span className="popup__error-visible" id="place-error" />
      <input
				type="url"
  	    placeholder="Ссылка на картинку"
    	  className="popup__form-input"
      	name="link"
	      id="link"
  	    required
    	  minLength={2}
				onChange={handleChangeLink}
				value={link}
      />
      <span className="popup__error-visible" id="link-error" />
		</PopupWithForm>
	)
}