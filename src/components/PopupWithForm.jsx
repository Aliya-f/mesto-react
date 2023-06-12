import React from 'react';

function PopupWithForm(props) {
  return ( <>
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form
        action="#"
        className={`popup__form form-${props.name}`}
        name={`${props.name}`}
        noValidate=""
        >
        {props.children}
        <button type="submit" className="popup__form-button">
        {props.buttonText}
        </button>
        </form>
        <button
        type="button"
        className="popup__close-button"
        aria-label="Закрыть"
        onClick={props.onClose}
        />
      </div>
    </div>
  </>
)}
//а вот как будет у попапа с картинкой:
//<div className={`popup popup_type_image ${card ? 'popup_is-opened' : ''}`}></div>

export default PopupWithForm;