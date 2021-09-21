import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesList from '../MoviesList/MoviesList';
import Footer from '../Footer/Footer';

function SavedMovies(props) {

  return (
    <section className="movies">
      <Header loggedIn={true} onSignOut={props.onSignOut} />
      <SearchForm />
      <MoviesList movies={props.savedMovies} savedMovies={props.savedMovies} handleDislike={props.handleDislike} saved={true} />
      <Footer />
    </section>
  )
}
  
export default SavedMovies;