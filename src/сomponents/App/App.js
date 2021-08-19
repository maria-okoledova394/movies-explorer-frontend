import Main from '../Main/Main';
import { Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import '../../vendor/fonts/fonts.css';

function App() {

  return (
    <div className="page">
      <Route path="/">
        <Main />
      </Route>      
    </div>
  )
}

export default App;