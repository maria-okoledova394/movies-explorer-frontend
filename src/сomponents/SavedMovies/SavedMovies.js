import React, { useState, useEffect } from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesList from '../MoviesList/MoviesList';
import Footer from '../Footer/Footer';

function SavedMovies(props) {

  const [searchWords, setSearchWords] = useState([]);
  const [savedFilteredMovies, setSavedFilteredMovies] = useState(props.savedMovies);
  const [isCheckbox, setIsCheckbox] = useState({ checked: false });

  useEffect(() => {
    setSavedFilteredMovies(props.savedMovies);
  }, [props.savedMovies]);

  function handleChangeCheckbox(checked) {
    setIsCheckbox({ checked });
  }

  function handleSetSearchWords(words) {
    setSearchWords(words)
  }

  function handleSearchMovies() {
      var films = []
      props.savedMovies.map((savedMovie) => {
          searchWords.map((word) => {
              if (savedMovie.nameRU.toUpperCase().includes(word.toUpperCase()) && (isCheckbox.checked? savedMovie.duration <= 40 : savedMovie.duration > 0)) {
                  films.push({
                    country: savedMovie.country,
                    director: savedMovie.director,
                    duration: savedMovie.duration,
                    year: savedMovie.year,
                    description: savedMovie.description,
                    image: savedMovie.image,
                    trailer: savedMovie.trailer,
                    nameRU: savedMovie.nameRU,
                    nameEN: savedMovie.nameEN,
                    thumbnail: savedMovie.thumbnail,
                    movieId: savedMovie.movieId,
                  });
              }
          })
      })
      setSavedFilteredMovies(films)
  }

  return (
    <section className="movies">
      <Header loggedIn={true} onSignOut={props.onSignOut} />
      <SearchForm onSearchMovies={handleSearchMovies} onSetSearchWords={handleSetSearchWords} handleChangeCheckbox={handleChangeCheckbox} isCheckbox={isCheckbox} />
      {(savedFilteredMovies.length === 0) ? <h2 className="movies__notfound-title">Ничего не найдено</h2> : <></>}
      <MoviesList showButton={false} movies={savedFilteredMovies} savedMovies={props.savedMovies} handleDislike={props.handleDislike} saved={true} />
      <Footer />
    </section>
  )
}
  
export default SavedMovies;