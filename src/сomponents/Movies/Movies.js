import React, { useState } from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesList from '../MoviesList/MoviesList';
import Footer from '../Footer/Footer';
import moviesApi from '../../utils/MoviesApi';

function Movies(props) {

  const [filtredMovies, setFiltredMovies] = useState([]);
  const [searchWords, setSearchWords] = useState([]);
  const [isCheckbox, setIsCheckbox] = useState({ checked: false });

  function handleSetSearchWords(words) {
    setSearchWords(words)
  }

  function handleChangeCheckbox(checked) {
    setIsCheckbox({ checked });
  }


  function handleSearchMovies() {
    moviesApi.getSearchedMovies()
    .then((searchMovies) => {
      var films = []
      searchMovies.map((searchMovie) => {
          searchWords.map((word) => {
              if (searchMovie.nameRU.toUpperCase().includes(word.toUpperCase()) && (isCheckbox.checked? searchMovie.duration <= 40 : searchMovie.duration > 0)) {
                  films.push({
                    country: searchMovie.country,
                    director: searchMovie.director,
                    duration: searchMovie.duration,
                    year: searchMovie.year,
                    description: searchMovie.description,
                    image: `https://api.nomoreparties.co${searchMovie.image.url}`,
                    trailer: searchMovie.trailerLink,
                    nameRU: searchMovie.nameRU,
                    nameEN: searchMovie.nameEN,
                    thumbnail: `https://api.nomoreparties.co${searchMovie.image.formats.thumbnail.url}`,
                    movieId: searchMovie.id,
                  });
              }
          })
      })
      setFiltredMovies(films)
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <section className="movies">
      <Header loggedIn={true}  onSignOut={props.onSignOut} />
      <SearchForm onSearchMovies={handleSearchMovies} onSetSearchWords={handleSetSearchWords} handleChangeCheckbox={handleChangeCheckbox} isCheckbox={isCheckbox} />
      <MoviesList savedMovies={props.savedMovies} handleLike={props.handleLike} handleDislike={props.handleDislike} movies={filtredMovies} saved={false} />
      <Footer />
    </section>
  )
  }
  
  export default Movies;