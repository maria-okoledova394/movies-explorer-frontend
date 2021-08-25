import React, { useState, useEffect } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import initialCards from '../../utils/constants';

function MoviesCardList() {

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
                itemsToAdd: 1
            });
        }
    }, [width.width]);

    return (
        <section className="card-list">
            {initialCards.slice(0, (cardsCount.itemsToShow)).map((card) => {
            return(
                <MoviesCard key={card.key} card={card} isLiked={true} />
            )})}
        </section>
    )
  }
  
  export default MoviesCardList;