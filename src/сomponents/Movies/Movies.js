import React, { useState, useEffect } from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesList from '../MoviesList/MoviesList';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import moviesApi from '../../utils/MoviesApi';

function Movies(props) {
  const [initialMovies, setInitialMovies] = useState([]);
  const [filtredMovies, setFiltredMovies] = useState([]);
  const [searchWords, setSearchWords] = useState([]);
  const [isCheckbox, setIsCheckbox] = useState({ checked: false });
  const [clickOnCheckbox, setClickOnCheckbox] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [firstSearch, setFirstSearch] = useState(true);
  const [searchMoviesMistakeMessage, setSearchMoviesMistakeMessage] = useState("");

  function handleSetSearchWords(words) {
    setSearchWords(words)
  }

  useEffect(() => {

    if (!firstSearch) {
      handleSearchMovies()
    }

  }, [clickOnCheckbox]);

  useEffect(() => {
    let cleanupFunction = false;
    if (JSON.parse(localStorage.getItem('searchWords'))) {
      setSearchWords(JSON.parse(localStorage.getItem('searchWords')))
    }
    if (JSON.parse(localStorage.getItem('filtredMovies'))) {
      if (JSON.parse(localStorage.getItem('filtredMovies')).length > 0) {
        setFiltredMovies(JSON.parse(localStorage.getItem('filtredMovies')))
        setShowButton(true)
      }
    }
    if (JSON.parse(localStorage.getItem('isCheckbox'))) {
      setIsCheckbox(JSON.parse(localStorage.getItem('isCheckbox')))
    }
    if (JSON.parse(localStorage.getItem('initialMovies')) > 0) {
      setInitialMovies(JSON.parse(localStorage.getItem('initialMovies')))
      filterMovies(JSON.parse(localStorage.getItem('initialMovies')))
    } else {
      moviesApi.getSearchedMovies()
      .then((initialMoviesFromApi) => {
        if(!cleanupFunction) {setInitialMovies(initialMoviesFromApi.map(
          function changeStringNames( initialMovieFromApi ) {
            return {
              country: initialMovieFromApi.country,
              director: initialMovieFromApi.director,
              duration: initialMovieFromApi.duration,
              year: initialMovieFromApi.year,
              description: initialMovieFromApi.description,
              image: `https://api.nomoreparties.co${initialMovieFromApi.image.url}`,
              trailer: initialMovieFromApi.trailerLink,
              nameRU: initialMovieFromApi.nameRU,
              nameEN: initialMovieFromApi.nameEN,
              thumbnail: `https://api.nomoreparties.co${initialMovieFromApi.image.formats.thumbnail.url}`,
              movieId: initialMovieFromApi.id,
            }
          }
        ))}
      })
      .catch(err => {
        console.log(err);
        setSearchMoviesMistakeMessage("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз")
      })
    }

    return () => cleanupFunction = true;
  }, []);

  useEffect(() => {

    if (!firstSearch) {
    localStorage.setItem('filtredMovies', JSON.stringify(filtredMovies))
    }

  }, [filtredMovies]);

  function filterMovies(initialMovies) {
    var films = []
    initialMovies.map((initialMovie) => {
        searchWords.map((searchWord) => {
            if (initialMovie.nameRU.toUpperCase().includes(searchWord.toUpperCase()) && (isCheckbox.checked? initialMovie.duration <= 40 : initialMovie.duration > 0) && ( films.indexOf(initialMovie) === -1 )) {
              films.push(initialMovie);
            }
        })
    })
    setFiltredMovies(films)    
    setShowButton(true)
    localStorage.setItem('searchWords', JSON.stringify(searchWords));
    films = []
  }

  useEffect(() => {

    if (!firstSearch) {      
      localStorage.setItem('initialMovies', JSON.stringify(initialMovies));
    }

  }, [initialMovies]);

  function handleSearchMovies() {
    document.querySelector('.preloader').classList.remove('preloader_status_notactive');
    filterMovies(initialMovies)
    setFirstSearch(false)    
    document.querySelector('.preloader').classList.add('preloader_status_notactive');
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
      <Preloader />
      {(filtredMovies.length === 0 && showButton) ? <h2 className="movies__notfound-title">Ничего не найдено</h2> : <></>}
      {(searchMoviesMistakeMessage === "") ? <></> : <h2 className="movies__notfound-title">{searchMoviesMistakeMessage}</h2>}
      <MoviesList showButton={showButton} savedMovies={props.savedMovies} handleLike={props.handleLike} handleDislike={props.handleDislike} movies={filtredMovies} saved={false} />
      <Footer />
    </section>
  )
  }
  
  export default Movies;