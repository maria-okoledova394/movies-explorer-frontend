import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies(props) {

    return (
      <section className="movies">
        <Header loggedIn={true} />
        <SearchForm />
        <MoviesCardList initialCards={props.initialCards} />
        <Footer />
      </section>
    )
  }
  
  export default SavedMovies;