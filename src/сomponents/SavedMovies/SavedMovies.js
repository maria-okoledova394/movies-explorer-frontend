import React, { useState } from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies(props) {

  const [cards, setCards] = useState([]);

  return (
    <section className="movies">
      <Header loggedIn={true} onSignOut={props.onSignOut} />
      <SearchForm />
      <MoviesCardList initialCards={cards} saved={true} />
      <Footer />
    </section>
  )
}
  
export default SavedMovies;