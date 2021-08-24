import React from 'react';
import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';

function Main() {

    return (
      <div className="page">
        <Header loggedIn={false} />
        <Promo />
        <NavTab />
        <AboutProject />
        <Techs />
        <AboutMe />        
      </div>
    )
  }
  
  export default Main;