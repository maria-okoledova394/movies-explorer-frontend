import React from 'react';
import Navigation from '../Navigation/Navigation';
import './Header.css';

function Header(props) {
    return (
        <div className={props.loggedIn ? "header__container header__container_loggedin" : "header__container header__container_notloggedin"}>
            <header className={props.loggedIn ? "header header_loggedin" : "header header_notloggedin"}>
                <div className="header__logo" alt="Логотип"></div>
                <Navigation loggedIn={props.loggedIn}/>
            </header>
        </div>  
    );
  }
  
  export default Header;