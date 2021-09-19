import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import mainApi from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { Route } from 'react-router-dom';
import { initialCardsMovies, initialCardsSavedMovies } from '../../utils/constants';
import './App.css';
import '../../vendor/fonts/fonts.css';

function App() {
  const history = useHistory();

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

  }, []);

  const [userData, setUserData] = useState({
    name: ' ',
    email: ' '
  });
  const [isMistake, setIsMistake] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  function handleError (error) {
    console.error(error)
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

  return (
    <div className="page">
      <Route path="/" exact>
        <Main />
      </Route>
      <ProtectedRoute path="/movies" loggedIn={loggedIn} component={Movies} initialCards={initialCardsMovies} />
      <Route path="/saved-movies">
        <SavedMovies initialCards={initialCardsSavedMovies} />
      </Route>  
      <Route path="/signup">
        <Register onSubmit={onRegister} />
      </Route>
      <Route path="/signin">
        <Login onSubmit={onLogin} />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
    </div>
  )
}

export default App;