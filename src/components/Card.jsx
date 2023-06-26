import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({
  onCardClick,
  link,
  name,
  likes,
  owner,
  _id,
  onCardDelete,
  onCardLike,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = owner._id === currentUser._id;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = likes.some((i) => i._id === currentUser._id);
  // Создаём переменные, которые зададим в `className` для кнопки лайка и удаления
  const cardLikeButtonClassName = `places__like-button ${
    isLiked && "like-button_type_active"
  }`;
  const cardDeleteButtonClassName = `places__delete ${
    isOwn ? "places__delete_show" : ""
  }`;

  function handleClick() {
    onCardClick({ link, name });
  }
  function handleDeleteClick() {
    onCardDelete(_id);
  }
  function handleLikeClick() {
    onCardLike({ likes, _id });
  }

  return (
    <li className="places__item">
      <img
        className="places__img"
        src={link}
        alt={name}
        onClick={handleClick}
      />
      <div className="places__content">
        <h2 className="places__title">{name}</h2>
        <div>
          <button
            className={cardLikeButtonClassName}
            aria-label="нравится"
            type="button"
            onClick={handleLikeClick}
          />
          <p className="places__like-quantity">0</p>
        </div>
        {isOwn && (
          <button
            className={cardDeleteButtonClassName}
            aria-label="удалить"
            type="button"
            onClick={handleDeleteClick}
          />
        )}
      </div>
    </li>
  );
}
