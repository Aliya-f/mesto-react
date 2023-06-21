import React from 'react';
import {api} from "../utils/Api.js";
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards([...res]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
    <main className="content">
      <section className="profile">
        <div className="profile__card">
          <div className="profile__image" onClick={onEditAvatar}>
          <img
          src={currentUser.avatar}
          alt="Фото профиля."
          className="profile__photo"
          />
          </div>
          <div className="profile__info">
            <div className="profile__name">
              <h1 className="profile__name-text">{currentUser.name}</h1>
              <button
            className="profile__edit-button"
            type="button"
            aria-label="Редактировать"
            onClick={onEditProfile}
              />
            </div>
            <p className="profile__description">{currentUser.about}</p>
          </div>
        </div>
        <button
        className="profile__add-button"
        type="button"
        aria-label="Добавить"
        onClick={onAddPlace}
        />
      </section>
      <section className="places" aria-label="места">
        <ul className="places__items">
        {cards.map((elem) => (
          <Card
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            link={elem.link}
            name={elem.name}
            likes={[...elem.likes]}
            key={elem._id}
            owner={elem.owner}
            _id={elem._id}
          />
        ))}
        </ul>
      </section>
    </main>
    </>
  )
}

export default Main;