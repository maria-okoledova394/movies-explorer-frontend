import React, { useState } from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import moviesApi from '../../utils/MoviesApi';

function Movies(props) {

  const [filmCards, setFilmCards] = useState([]);
  const [searchWords, setSearchWords] = useState([]);

  function handleSetSearchWords(words) {
    setSearchWords(words)
  }

  function handleSearchMovie() {
    moviesApi.getSearcheddCards()
    .then((data) => {
      var films = []
      data.map((card) => {
          searchWords.map((word) => {
              if (card.nameRU.toUpperCase().includes(word.toUpperCase())) {
                  films.push(card);
              }
          })
      })
      setFilmCards(films)
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <section className="movies">
      <Header loggedIn={true}  onSignOut={props.onSignOut} />
      <SearchForm onSearchMovie={handleSearchMovie} onSetSearchWords={handleSetSearchWords} />
      <MoviesCardList cards={filmCards} saved={false} />
      <Footer />
    </section>
  )
  }
  
  export default Movies;