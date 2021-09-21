import React, { useState, useEffect } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
    const finalCards = props.cards;

    const [cardsCount, setCardsCount] = useState({
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
        setCardsCount({
            itemsToShow: cardsCount.itemsToShow + cardsCount.itemsToAdd,
            itemsToAdd: cardsCount.itemsToAdd
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
            setCardsCount({ 
                itemsToShow: 12,
                itemsToAdd: 3
            });
        } else if (width >= 768) {
            setCardsCount({ 
                itemsToShow: 8,
                itemsToAdd: 2
            });
        } else {
            setCardsCount({ 
                itemsToShow: 5,
                itemsToAdd: 2
            });
        }
    }, [width.width]);

    return (
        <section className="card-list">
            <div className="card-list__container">
                {finalCards.slice(0, (cardsCount.itemsToShow)).map((card) => {
                return(
                    <MoviesCard handleLike={props.handleLike} handleDislike={props.handleDislike} savedMovies={props.savedMovies} key={card.id} card={card} saved={props.saved} />
                )})}
            </div>
            <button className="card-list__button" onClick={handleClick}>Ещё</button>
        </section>
    )
  }
  
  export default MoviesCardList;