import React from 'react';
import './MovieCard.css';

function MovieCard(props) {
    const isLiked = props.savedMovies.some(movie => movie.movieId === props.movieCard.movieId);

    var savedMoviedId = ' '
    props.savedMovies.forEach(function(item) {
        if (item.movieId === props.movieCard.movieId) {
          savedMoviedId = item._id
        }
    });

    const cardLikeButtonClassName = (
        `card__like-button ${isLiked ? 'card__like-button_status_active' : 'card__like-button_status_notactive'}`
    );

    function handleLikeClick() {
        if (!isLiked) {
            props.handleLike(props.movieCard)
          }
          else {        
            props.handleDislike(savedMoviedId)
        }
    }

    function handleDeleteClick() {
        props.handleDislike(savedMoviedId)
    }

    return (
        <div className="card">
            <img className="card__image" alt={props.movieCard.name} src={props.movieCard.image}/>
            <div className="card__info">
                <div className="card__info-row">
                    <h2 className="card__title">{props.movieCard.nameRU}</h2>
                    {props.saved
                    ?
                    <button className="card__dislike-button" type="button" onClick={handleDeleteClick}></button>
                    :
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                    }
                </div>
                <p className="card__duration">{props.movieCard.duration}</p>
            </div>
        </div>  
    );
  }
  
  export default MovieCard;