import React from 'react';
import {api} from "../utils/Api.js";
import Card from './Card';

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick}) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
      })
      .catch((err) => console.log(err));
  }, []);

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
          src={userAvatar}
          alt="Фото профиля."
          className="profile__photo"
          />
          </div>
          <div className="profile__info">
            <div className="profile__name">
              <h1 className="profile__name-text">{userName}</h1>
              <button
            className="profile__edit-button"
            type="button"
            aria-label="Редактировать"
            onClick={onEditProfile}
              />
            </div>
            <p className="profile__description">{userDescription}</p>
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
            link={elem.link}
            name={elem.name}
            likes={[...elem.likes]}
            key={elem._id}
          />
        ))}
        </ul>
      </section>
    </main>
    </>
  )
}

export default Main;