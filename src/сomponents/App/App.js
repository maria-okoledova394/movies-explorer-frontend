import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import mainApi from '../../utils/MainApi';
import { Route } from 'react-router-dom';
import { initialCardsMovies, initialCardsSavedMovies } from '../../utils/constants';
import './App.css';
import '../../vendor/fonts/fonts.css';

function App() {
  const history = useHistory();

  const [userData, setUserData] = useState({
    name: ' ',
    email: ' '
  });
  const [isMistake, setIsMistake] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  function handleError (error) {
    console.error(error)
  }

  function checkToken() {
    const token = localStorage.getItem('token')
    
    if (token) {
      mainApi.setToken(token);
      mainApi.getContent(token)
        .then((res) => {
          if (res){
            setUserData({
              name: res.name,
              email: res.email
            })
            setLoggedIn(true)
            history.push("/movies")
          }
        })
        .catch(handleError)
    }
  }

  function onRegister({ name, email, password }) {
    mainApi.register(name, email, password)
      .then((res) => {
        setIsMistake(false)
        return(res);
      })
      .then(() => {
        mainApi.authorize(email, password)
        .then((res) => {
          const token = res.token
          if (token) {
            localStorage.setItem('token', token)
            checkToken();
          }
        })
      })
      .then(()=> {
        history.push('/movies')
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
      <Route path="/movies">
        <Movies initialCards={initialCardsMovies} />
      </Route>  
      <Route path="/saved-movies">
        <SavedMovies initialCards={initialCardsSavedMovies} />
      </Route>  
      <Route path="/signup">
        <Register onSubmit={onRegister} />
      </Route>
      <Route path="/signin">
        <Login />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
    </div>
  )
}

export default App;