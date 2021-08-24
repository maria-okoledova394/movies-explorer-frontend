import React from 'react';
import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';

function Main() {

    return (
      <div className="page">
        <Header loggedIn={false} />
        <Promo />
        <NavTab />
        <AboutProject />
        <Techs />
      </div>
    )
  }
  
  export default Main;