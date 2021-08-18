import Main from '../Main/Main';
import { Route } from 'react-router-dom';
import React from 'react';

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