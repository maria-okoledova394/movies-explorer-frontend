import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import mainApi from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
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

  const [loginMistakeMessage, setLoginMistakeMessage] = useState("");
  const [registerMistakeMessage, setRegisterMistakeMessage] = useState("");
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

    /*mainApi.getSavedMovies()
    .then((res) => {
      if (res){
        setSavedMovies(res.movies)
      }
    })*/
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
    .catch((error) => {
      handleError(error)
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
      .catch((error) => {
        handleError(error)
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
      setLoggedIn(false)
      return(res)
    })
    .catch((error) => {
      handleError(error)
    })
  }

  function onUpdateUserData(data) {
    mainApi.changeProfileInfo(data)
    .then (data => {
      setUserData(data);
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <CurrentUserContext.Provider value={userData}>
      <div className="page">
        <Switch>
          <Route path="/" exact>
            <Main />
          </Route>
          <ProtectedRoute path="/movies" handleLike={handleLike} handleDislike={handleDislike} loggedIn={loggedIn} component={Movies} savedMovies={savedMovies} onSignOut={onSignOut} />
          <ProtectedRoute path="/saved-movies" loggedIn={loggedIn} component={SavedMovies} handleDislike={handleDislike} savedMovies={savedMovies} onSignOut={onSignOut} />
          <Route path="/signup">
            <Register onSubmit={onRegister} mistakeMessage={registerMistakeMessage} />
          </Route>
          <Route path="/signin">
            <Login onSubmit={onLogin} mistakeMessage={loginMistakeMessage} />
          </Route>
          <ProtectedRoute path="/profile" loggedIn={loggedIn} component={Profile} onSignOut={onSignOut} onUpdateUserData={onUpdateUserData} />
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;