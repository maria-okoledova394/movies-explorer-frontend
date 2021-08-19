import React from 'react';
import Navigation from '../Navigation/Navigation';
import './Header.css';

function Header() {
    return (
        <div className="header__container">
            <header className="header">
                <div className="header__logo"></div>
                <Navigation loggedIn='false'/>
            </header>
        </div>  
    );
  }
  
  export default Header;