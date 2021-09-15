import React, { useState } from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import moviesApi from '../../utils/MoviesApi';

function Movies(props) {

  const [cards, setCards] = useState([]);

  function handleSearchMovie(e) {
    e.preventDefault();

    moviesApi.getSearcheddCards()
    .then (data => {
      setCards(data);
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <section className="movies">
      <Header loggedIn={true} />
      <SearchForm onGetCards={handleSearchMovie}/>
      <MoviesCardList initialCards={cards} saved={false} />
      <Footer />
    </section>
  )
  }
  
  export default Movies;