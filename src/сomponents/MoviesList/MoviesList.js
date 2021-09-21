import React, { useState, useEffect } from 'react';
import './MoviesList.css';
import MovieCard from '../MovieCard/MovieCard';

function MoviesList(props) {
    const movies = props.movies;

    const [moviesCardsCount, setMoviesCardsCount] = useState({
        itemsToShow: 0,
        itemsToAdd: 0
    });

    const [width, setWidth] = React.useState({
        width: window.innerWidth
    });

    const handleResize = () => {
        setWidth({
        width: window.innerWidth,
        });
    }

    const handleClick = () => {
        setMoviesCardsCount({
            itemsToShow: moviesCardsCount.itemsToShow + moviesCardsCount.itemsToAdd,
            itemsToAdd: moviesCardsCount.itemsToAdd
        });
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        // получим корневой элемент <html>
        const $html = document.documentElement;
        // узнаем его ширину
        const width = $html.clientWidth;

        if (width >= 1280) {
            setMoviesCardsCount({ 
                itemsToShow: 12,
                itemsToAdd: 3
            });
        } else if (width >= 768) {
            setMoviesCardsCount({ 
                itemsToShow: 8,
                itemsToAdd: 2
            });
        } else {
            setMoviesCardsCount({ 
                itemsToShow: 5,
                itemsToAdd: 2
            });
        }
    }, [width.width]);

    return (
        <section className="card-list">
            <div className="card-list__container">
                {movies.slice(0, (moviesCardsCount.itemsToShow)).map((movieCard) => {
                return(
                    <MovieCard handleLike={props.handleLike} handleDislike={props.handleDislike} savedMovies={props.savedMovies} key={movieCard.movieId} movieCard={movieCard} saved={props.saved} />
                )})}
            </div>
            <button className="card-list__button" onClick={handleClick}>Ещё</button>
        </section>
    )
  }
  
  export default MoviesList;