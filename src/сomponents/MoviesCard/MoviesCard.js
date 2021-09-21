import React, { useState, useEffect, useMemo } from 'react';
import './MoviesCard.css';

function MoviesCard(props) {
    const isLiked = props.savedMovies.some(movie => movie.movieId === props.card.id);

    var savedMoviedId = ' '
    props.savedMovies.forEach(function(item) {
        if (item.movieId === props.card.id) {
          savedMoviedId = item._id
        }
    });

    const cardLikeButtonClassName = (
        `card__like-button ${isLiked ? 'card__like-button_status_active' : 'card__like-button_status_notactive'}`
    );

    function handleLikeClick() {
        if (!isLiked) {
            props.handleLike(props.card)
          }
          else {        
            props.handleDislike(savedMoviedId)
        }
    }

    return (
        <div className="card">
            <img className="card__image" alt={props.card.name} src={`https://api.nomoreparties.co${props.card.image.url}`}/>
            <div className="card__info">
                <div className="card__info-row">
                    <h2 className="card__title">{props.card.nameRU}</h2>
                    {props.saved
                    ?
                    <button className="card__dislike-button" type="button"></button>
                    :
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                    }
                </div>
                <p className="card__duration">{props.card.duration}</p>
            </div>
        </div>  
    );
  }
  
  export default MoviesCard;