import React from 'react';
import Navigation from '../Navigation/Navigation';
import './Header.css';

function Header(props) {
    return (
        <div className="header__container">
            <header className="header">
                <div className="header__logo" alt="Логотип"></div>
                <Navigation loggedIn={props.loggedIn}/>
            </header>
        </div>  
    );
  }
  
  export default Header;