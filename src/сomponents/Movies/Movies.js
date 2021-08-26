import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies(props) {

    return (
      <section className="movies">
        <Header loggedIn={true} />
        <SearchForm />
        <MoviesCardList initialCards={props.initialCards} saved={false}/>
        <Footer />
      </section>
    )
  }
  
  export default Movies;