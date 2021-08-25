import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';

function Movies() {

    return (
      <section className="movies">
        <Header loggedIn={true} />
        <SearchForm />
      </section>
    )
  }
  
  export default Movies;