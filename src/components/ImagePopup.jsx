import React from "react";

export default function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup popup_type_open-image ${card ? "popup_opened" : ""}`}
    >
      <div className="popup__image-conteiner">
        <img
          className="popup__image"
          src={card ? card.link : "#"}
          alt={card ? card.name : ""}
        />
        <h2 className="popup__title-card">{card ? card.name : ""}</h2>
        <button
          className="popup__close-button"
          type="button"
          aria-label="закрыть"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}
