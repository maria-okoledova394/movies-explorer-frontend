import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import './Header.css';

function Header(props) {
    return (
        <div className={props.loggedIn ? "header__container header__container_loggedin" : "header__container header__container_notloggedin"}>
            <header className={props.loggedIn ? "header header_loggedin" : "header header_notloggedin"}>
                <Link className="header__logo" alt="Логотип" to="/" ></Link>
                <Navigation loggedIn={props.loggedIn}/>
            </header>
        </div>  
    );
  }
  
  export default Header;