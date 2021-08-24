import React from 'react';
import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';

function Main() {

    return (
      <div className="page">
        <Header loggedIn={false} />
        <Promo />
        <NavTab />
        <AboutProject />
      </div>
    )
  }
  
  export default Main;