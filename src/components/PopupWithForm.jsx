import React from "react";

function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form
          action="#"
          className={`popup__form form-${props.name}`}
          name={`${props.name}`}
          noValidate=""
          onSubmit={props.onSubmit}
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
  );
}

export default PopupWithForm;
