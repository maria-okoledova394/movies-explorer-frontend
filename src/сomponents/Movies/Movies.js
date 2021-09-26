import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesList from '../MoviesList/MoviesList';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import moviesApi from '../../utils/MoviesApi';

function Movies(props) {
  const [searchMoviesMistakeMessage, setSearchMoviesMistakeMessage] = useState("");
  const [searchWords, setSearchWords] = useState([]);
  const [filtredMovies, setFiltredMovies] = useState([]);
  const [isCheckbox, setIsCheckbox] = useState({ checked: false });
  const [clickOnCheckbox, setClickOnCheckbox] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [firstSearch, setFirstSearch] = useState(true);

  function handleSetSearchWords(words) {
    setSearchWords(words)
  }

  /*useEffect(() => {

    if (!firstSearch.current) {
      handleSearchMovies()
    }    

  }, [clickOnCheckbox]);*/

  useEffect(() => {

    if (!firstSearch) {
      handleSearchMovies()
    }

  }, [clickOnCheckbox]);

  useEffect(() => {
    // firstSearch.current = false
    if (JSON.parse(localStorage.getItem('filtredMovies'))) {
      if (JSON.parse(localStorage.getItem('filtredMovies')).length > 0) {
        setFiltredMovies(JSON.parse(localStorage.getItem('filtredMovies')))
        setShowButton(true)
      }
    }
    if (JSON.parse(localStorage.getItem('isCheckbox'))) {
      setIsCheckbox(JSON.parse(localStorage.getItem('isCheckbox')))
    }
    if (JSON.parse(localStorage.getItem('searchWords'))) {
      setSearchWords(JSON.parse(localStorage.getItem('searchWords')))
    }

  }, []);
  

  useEffect(() => {

    localStorage.setItem('filtredMovies', JSON.stringify(filtredMovies));

  }, [filtredMovies]);

  function filterMovies(movies) {
    var films = []
    movies.map((searchMovie) => {
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
  }

  function handleSearchMovies() {
    setFirstSearch(false)
    setIsLoad(true)
    moviesApi.getSearchedMovies()
    .then((searchMovies) => {
      filterMovies(searchMovies)
      setShowButton(true)
    })
    .finally(() => {
      setIsLoad(false)
      localStorage.setItem('searchWords', JSON.stringify(searchWords));
    })
    .catch(err => {
      console.log(err);
      setSearchMoviesMistakeMessage("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз")
    })
  }
  
  function handleChangeCheckbox(checked) {
    setFirstSearch(false)
    setClickOnCheckbox(!clickOnCheckbox)
    setIsCheckbox({ checked });
    localStorage.setItem('isCheckbox', JSON.stringify({ checked }));
  }

  return (
    <section className="movies">
      <Header loggedIn={true}  onSignOut={props.onSignOut} />
      <SearchForm onSearchMovies={handleSearchMovies} onSetSearchWords={handleSetSearchWords} handleChangeCheckbox={handleChangeCheckbox} isCheckbox={isCheckbox} />
      {isLoad ? <Preloader /> : <></>}
      {(filtredMovies.length === 0 && showButton && !isLoad) ? <h2 className="movies__notfound-title">Ничего не найдено</h2> : <></>}
      {(searchMoviesMistakeMessage === "") ? <></> : <h2 className="movies__notfound-title">{searchMoviesMistakeMessage}</h2>}
      <MoviesList isLoad={isLoad} showButton={showButton} savedMovies={props.savedMovies} handleLike={props.handleLike} handleDislike={props.handleDislike} movies={filtredMovies} saved={false} />
      <Footer />
    </section>
  )
  }
  
  export default Movies;