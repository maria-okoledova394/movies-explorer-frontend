import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';
import accountIcon from '../../images/navigation-account-icon.svg';

function Navigation(props) {
    return (
        <>
            {props.loggedIn ?         
                <ul className="navigation navigation_loggedin">
                    <li className="navigation__movies-link"><Link className="navigation__link navigation__link_loggedin" to="/signin">Фильмы</Link></li>
                    <li className="navigation__saved-movies-link"><Link className="navigation__link navigation__link_loggedin" to="/signup">Сохраненные Фильмы</Link></li>
                    <li className="navigation__account-link"><Link className="navigation__link navigation__link_loggedin" to="/signup">Аккаунт<img class="navigation__account-icon" alt="иконка Аккаунт" src={accountIcon}></img></Link></li>
                </ul>
            :
                <ul className="navigation navigation_notloggedin">
                    <li><Link to="/signup" className="navigation__link navigation__link_notloggedin navigation__link__register">Регистрация</Link></li>
                    <li><Link to="/signin" className="navigation__link navigation__link_notloggedin navigation__link_login">Войти</Link></li>
                </ul>
            }
        </>   
    );
  }
  
  export default Navigation;