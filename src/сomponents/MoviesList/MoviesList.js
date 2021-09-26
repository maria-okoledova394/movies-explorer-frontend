import React, { useState, useEffect } from 'react';
import './MoviesList.css';
import MovieCard from '../MovieCard/MovieCard';

function MoviesList(props) {
    const movies = props.movies;
    const [moviesCardsCount, setMoviesCardsCount] = useState({
        itemsToShowMax: 0,
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
            ...moviesCardsCount,
            itemsToShow: moviesCardsCount.itemsToShow + moviesCardsCount.itemsToAdd,
        });
    }

    useEffect(() => {
        let isMounted = true;

        if (!isMounted ) {
            window.addEventListener("resize", handleResize);
        }

        return () => {
            isMounted = false
        };
        
    }, []);

    useEffect(() => {
        let isMounted = true;
        const $html = document.documentElement;
        const width = $html.clientWidth;
        if (props.saved){ 
            if (width >= 1280) {
                if (isMounted) {setMoviesCardsCount({
                    itemsToShowMax: 12,
                    itemsToShow: 12,
                    itemsToAdd: 3
                });
            }} else if (width >= 768) {
                if (isMounted) {setMoviesCardsCount({
                    itemsToShowMax: 8,
                    itemsToShow: 12,
                    itemsToAdd: 2
                });
            }} else {
                if (isMounted) {setMoviesCardsCount({
                    itemsToShowMax: 5,
                    itemsToShow: 12,
                    itemsToAdd: 2
                });
            }}
        } else {
            if (width >= 1280) {
                if (isMounted) {setMoviesCardsCount({
                    itemsToShowMax: 12,
                    itemsToShow: 3,
                    itemsToAdd: 3
                });
            }} else if (width >= 768) {
                if (isMounted) {setMoviesCardsCount({
                    itemsToShowMax: 8,
                    itemsToShow: 2,
                    itemsToAdd: 2
                });
            }} else {
                if (isMounted) {setMoviesCardsCount({
                    itemsToShowMax: 5,
                    itemsToShow: 1,
                    itemsToAdd: 2
                });
            }}
        }

        return () => {
            isMounted = false
        };
    }, [width.width, props.isLoad]);

    return (
        <section className="card-list">
            <div className="card-list__container">
                {movies.slice(0, (moviesCardsCount.itemsToShow)).map((movieCard) => {
                    return(
                        <MovieCard handleLike={props.handleLike} handleDislike={props.handleDislike} savedMovies={props.savedMovies} key={movieCard.movieId} movieCard={movieCard} saved={props.saved} />
                    )})}
            </div>
            {(props.showButton && movies.length > 3 && (moviesCardsCount.itemsToShowMax > moviesCardsCount.itemsToShow) && (moviesCardsCount.itemsToShow < movies.length)) ? <button className="card-list__button" onClick={handleClick}>Ещё</button> : <></>}            
        </section>
    )
  }
  
  export default MoviesList;