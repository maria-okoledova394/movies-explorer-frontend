import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation(props) {
    return (
        <>
            {props.loggedIn === true ?         
                <ul className="navigation-loggedin">
                    <li><Link to="/signin" className="navigation__login-link">Фильмы</Link></li>
                    <li><Link to="/signup" className="navigation__register-link">Сохраненные Фильмы</Link></li>
                </ul>
            :
                <ul className="navigation-notloggedin">
                    <li><Link to="/signup" className="navigation__link navigation__link__register">Регистрация</Link></li>
                    <li><Link to="/signin" className="navigation__link navigation__link_login">Войти</Link></li>
                </ul>
            }
        </>   
    );
  }
  
  export default Navigation;