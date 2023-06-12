import React from 'react';

export default function Card({onCardClick, link, name}) {

  function handleClick() {
    onCardClick({link, name});
  }  

  return (
    <li className="places__item"> 
      <img className='places__img' 
      src={link} 
      alt={name} 
      onClick={handleClick}
      />
      <div className='places__content'>
        <h2 className='places__title'>{name}</h2>
        <div>
          <button 
          className='places__like-button' 
          aria-label='нравится' 
          type='button'>
          </button>
          <p className='places__like-quantity'>0</p>
        </div>
        <button 
        className='places__delete' 
        aria-label='удалить' 
        type='button'>
        </button>
      </div>
    </li> 
  );
}
