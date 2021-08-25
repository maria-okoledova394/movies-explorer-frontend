import React from 'react';
import './MoviesCard.css';

function MoviesCard(props) {

    const cardLikeButtonClassName = (
        `card__like-button ${props.isLiked ? 'card__like-button_status_active' : 'card__like-button_status_notactive'}`
    );

    return (
        <div className="card">
            <img className="card__image" alt={props.card.name} src={props.card.link}/>
            <div className="card__info">
                <h2 className="card__title">{props.card.name}</h2>
                <button className={cardLikeButtonClassName} type="button"></button>
                <p className="card__duration">{props.card.duration}</p>
            </div>
        </div>  
    );
  }
  
  export default MoviesCard;