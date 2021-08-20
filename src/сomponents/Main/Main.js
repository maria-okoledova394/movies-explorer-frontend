import React from 'react';
import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';

function Main() {

    return (
      <div className="page">
        <Header loggedIn={false} />
        <Promo />
        <NavTab />
      </div>
    )
  }
  
  export default Main;