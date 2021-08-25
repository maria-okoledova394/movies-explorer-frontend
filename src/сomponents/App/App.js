import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import { Route } from 'react-router-dom';
import React from 'react';
import { initialCardsMovies, initialCardsSavedMovies } from '../../utils/constants';
import './App.css';
import '../../vendor/fonts/fonts.css';

function App() {

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
    </div>
  )
}

export default App;