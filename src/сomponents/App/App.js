import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import mainApi from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './App.css';
import '../../vendor/fonts/fonts.css';

function App() {
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [userData, setUserData] = useState({
    name: ' ',
    email: ' '
  });  
  const [loginMistakeMessage, setLoginMistakeMessage] = useState("");
  const [registerMistakeMessage, setRegisterMistakeMessage] = useState("");

  function handleError (err) {
    console.error(err)
  }

  useEffect(() => {

    mainApi.getProfileInfo()
    .then((res) => {
      if (res){
        setUserData({
          name: res.name,
          email: res.email
        })
        setIsLoggedIn(true)
      }
    })
    .then(()=> {
      mainApi.getSavedMovies()
      .then((res) => {
        if (res){
          setSavedMovies(res.movies)
        }
      })
      .catch(err => {
        console.log(err);
      })
      history.push('/movies')
    })
    .catch((err) => {
      handleError(err)
    })

  }, []);

  function handleLike (movie) {
    mainApi.addToSaved({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: movie.image,
        trailer: movie.trailer,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: movie.thumbnail,
        movieId: movie.movieId,
    })
    .then (newSavedMovie => {
      setSavedMovies([newSavedMovie, ...savedMovies]);
    })
    .catch((err) => {
      handleError(err)
    })
  }

  function handleDislike (savedMoviedId) {
    mainApi.removeFromSaved(savedMoviedId)
    .then (() => {
      setSavedMovies((state) => state.filter((c) => c._id !== savedMoviedId));
    })
    .catch((err) => {
      handleError(err)
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
          setIsLoggedIn(true)
          setLoginMistakeMessage("")
        }        
      })
    })
    .then(()=> {
      mainApi.getSavedMovies()
      .then((res) => {
        if (res){
          setSavedMovies(res.movies)
        }
      })
      history.push('/movies')
    })
    .catch((err) => {
      handleError(err)
      setLoginMistakeMessage("Ошибка авторизации")
      console.log('че')
    })
  }

  function onRegister({ name, email, password }) {
    mainApi.register(name, email, password)
      .then((res) => {
        setRegisterMistakeMessage("")
        return(res);        
      })
      .then(() => {
        onLogin({ email, password })
      })
      .catch((err) => {
        handleError(err)
        setRegisterMistakeMessage("Ошибка регистрации")
      })
  }

  function onSignOut() {
    mainApi.logout()
    .then((res) => {
      setUserData({
        name: ' ',
        email: ' '
      })
      setIsLoggedIn(false)
      localStorage.removeItem("filtredMovies");
      localStorage.removeItem("isCheckbox");
      localStorage.removeItem("inputData");
      localStorage.removeItem("searchWords");
      return(res)
    })
    .catch((err) => {
      handleError(err)
    })
  }

  function onUpdateUserData(data) {
    mainApi.changeProfileInfo(data)
    .then (data => {
      setUserData(data);
    })
    .catch((err) => {
      handleError(err)
    })
  }

  return (
    <CurrentUserContext.Provider value={userData}>
      <div className="page">
        <Switch>
          <Route path="/" exact>
            <Main />
          </Route>
          <ProtectedRoute path="/movies" handleLike={handleLike} handleDislike={handleDislike} loggedIn={isLoggedIn} component={Movies} savedMovies={savedMovies} onSignOut={onSignOut} />
          <ProtectedRoute path="/saved-movies" loggedIn={isLoggedIn} component={SavedMovies} handleDislike={handleDislike} savedMovies={savedMovies} onSignOut={onSignOut} />
          <Route path="/signup">
            <Register onSubmit={onRegister} mistakeMessage={registerMistakeMessage} />
          </Route>
          <Route path="/signin">
            <Login onSubmit={onLogin} mistakeMessage={loginMistakeMessage} />
          </Route>
          <ProtectedRoute path="/profile" loggedIn={isLoggedIn} component={Profile} onSignOut={onSignOut} onUpdateUserData={onUpdateUserData} />
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;