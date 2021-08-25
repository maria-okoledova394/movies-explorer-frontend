import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import { Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import '../../vendor/fonts/fonts.css';

function App() {

  return (
    <div className="page">
      <Route path="/" exact>
        <Main />
      </Route>
      <Route path="/movies">
        <Movies />
      </Route>  
    </div>
  )
}

export default App;