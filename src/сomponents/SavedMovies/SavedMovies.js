import React, { useState, useEffect, useRef } from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesList from '../MoviesList/MoviesList';
import Preloader from '../Preloader/Preloader';
import Footer from '../Footer/Footer';

function SavedMovies(props) {
  const firstSearch = useRef(true);
  const [searchWords, setSearchWords] = useState([]);
  const [savedFilteredMovies, setSavedFilteredMovies] = useState(props.savedMovies);
  const [isCheckbox, setIsCheckbox] = useState({ checked: false });
  const [clickOnCheckbox, setClickOnCheckbox] = useState(false);

  useEffect(() => {
    setSavedFilteredMovies(props.savedMovies);
  }, [props.savedMovies]);

  useEffect(() => {

    if (!firstSearch.current) {
      handleSearchMovies()
    }    

  }, [clickOnCheckbox]);

  useEffect(() => {
    firstSearch.current = false
  }, []);

  function handleSetSearchWords(words) {
    setSearchWords(words)
  }

  function handleSearchMovies() {
      const films = []
      props.savedMovies.map((savedMovie) => {
          if (searchWords.length !== 0) {
            searchWords.map((word) => {
              if (savedMovie.nameRU.toUpperCase().includes(word.toUpperCase()) && (isCheckbox.checked? savedMovie.duration <= 40 : savedMovie.duration > 0)) {
                  films.push(savedMovie);
              }
          })
          } else if (isCheckbox.checked? savedMovie.duration <= 40 : savedMovie.duration > 0) {
              films.push(savedMovie);
          }
      })
      setSavedFilteredMovies(films)
  }

  function handleChangeCheckbox(checked) {
    setIsCheckbox({ checked });
    setClickOnCheckbox(!clickOnCheckbox)
  }

  return (
    <section className="movies">
      <Header loggedIn={true} onSignOut={props.onSignOut} />
      <SearchForm onSearchMovies={handleSearchMovies} onSetSearchWords={handleSetSearchWords} handleChangeCheckbox={handleChangeCheckbox} isCheckbox={isCheckbox} saved={true}/>
      {(savedFilteredMovies.length === 0) ? <h2 className="movies__notfound-title">Ничего не найдено</h2> : <></>}
      <MoviesList showButton={false} movies={savedFilteredMovies} savedMovies={props.savedMovies} handleDislike={props.handleDislike} saved={true} />
      <Footer />
    </section>
  )
}
  
export default SavedMovies;