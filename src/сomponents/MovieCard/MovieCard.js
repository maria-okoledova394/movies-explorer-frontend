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

    function timeConvert(duration) {
        const hours = (duration / 60);
        const rhours = Math.floor(hours);
        const minutes = (hours - rhours) * 60;
        const rminutes = Math.round(minutes);
        return rhours + "ч " + rminutes + "м";
    }

    return (
        <div className="card">
            <a href={props.movieCard.trailer} className="card__image-link" target="_blank" rel="noreferrer"><img className="card__image" alt={props.movieCard.name} src={props.movieCard.image} /></a>
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
                <p className="card__duration">{timeConvert(props.movieCard.duration)}</p>
            </div>
        </div>  
    );
  }
  
  export default MovieCard;