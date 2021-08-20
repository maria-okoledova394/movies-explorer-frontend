import React from 'react';
import Header from '../Header/Header';
import Promo from '../Promo/Promo';

function Main() {

    return (
      <div className="page">
        <Header loggedIn={false} />
        <Promo />
      </div>
    )
  }
  
  export default Main;