import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import mainApi from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import './App.css';
import '../../vendor/fonts/fonts.css';

function App() {
  const history = useHistory();

  const [savedMovies, setSavedMovies] = useState([]);
  const [userData, setUserData] = useState({
    name: ' ',
    email: ' '
  });
  const [isMistake, setIsMistake] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {

    mainApi.getProfileInfo()
    .then((res) => {
      if (res){
        setUserData({
          name: res.name,
          email: res.email
        })
        setLoggedIn(true)
      }
    })
    .then(()=> {
      history.push('/movies')
    })
    .catch(err => {
      console.log(err);
    })

    mainApi.getSavedMovies()
    .then((res) => {
      if (res){
        console.log(res)
        setSavedMovies(res.movies)
      }
    })
    .catch(err => {
      console.log(err);
    })

  }, []);

  function handleError (error) {
    console.error(error)
  }

  function handleLike (movie) {
    mainApi.addToSaved({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `https://api.nomoreparties.co${movie.image.url}`,
        trailer: movie.trailerLink,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
    })
    .then (newSavedMovie => {
      console.log('setSavedMovies after like')
      console.log(newSavedMovie)
      setSavedMovies([newSavedMovie, ...savedMovies]);
    })
    .catch(err => {
    console.log(err);
    })
  }

  function handleDislike (savedMoviedId) {
    mainApi.removeFromSaved(savedMoviedId)
    .then (removedMovie => {
      setSavedMovies((state) => state.filter((c) => c._id !== savedMoviedId));
    })
    .catch(err => {
      console.log(err);
    })
  }

  function onLogin({ email, password }) {
    mainApi.authorize(email, password)
    .then(() => {
      return mainApi.getProfileInfo()
      .then((res) => {
        if (res){
          setUserData({
            name: res.name,
            email: res.email
          })
          setLoggedIn(true)
        }
      })
    })
    .then(()=> {
      history.push('/movies')
    })
    .catch(handleError)
  }

  function onRegister({ name, email, password }) {
    mainApi.register(name, email, password)
      .then((res) => {
        setIsMistake(false)
        return(res);
      })
      .then(() => {
        onLogin({ email, password })
      })
      .catch((error) => {
        handleError(error)
        setIsMistake(true)
      })
  }

  function onSignOut() {
    mainApi.logout()
    .then((res) => {
      setUserData({
        name: ' ',
        email: ' '
      })
      setLoggedIn(false)
      return(res)
    })
    .catch((error) => {
      handleError(error)
      setIsMistake(true)
    })
  }

  return (
    <div className="page">
      <Switch>
        <Route path="/" exact>
          <Main />
        </Route>
        <ProtectedRoute path="/movies" handleLike={handleLike} handleDislike={handleDislike} loggedIn={loggedIn} component={Movies} savedMovies={savedMovies} onSignOut={onSignOut} />
        <ProtectedRoute path="/saved-movies" loggedIn={loggedIn} component={SavedMovies} savedMovies={savedMovies} onSignOut={onSignOut} />
        <Route path="/signup">
          <Register onSubmit={onRegister} />
        </Route>
        <Route path="/signin">
          <Login onSubmit={onLogin} />
        </Route>
        <ProtectedRoute path="/profile" loggedIn={loggedIn} component={Profile} onSignOut={onSignOut} />
      </Switch>
    </div>
  )
}

export default App;