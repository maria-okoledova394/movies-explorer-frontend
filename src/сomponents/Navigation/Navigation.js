import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';
import accountIcon from '../../images/navigation-account-icon.svg';

function Navigation(props) {
    const [links, setLinks] = useState(false);

    
    const linksClassName = (
        `navigation__links ${links ? 'navigation__links_status_active' : 'navigation__links_status_notactive'}`
    );

    const buttonClassName = (
        `navigation__button ${links ? 'navigation__button_status_notactive' : 'navigation__button_status_active'}`
    );

    const closeButtonClassName = (
        `close__button ${links ? 'close__button_status_active' : 'close__button_status_notactive'}`
    );

    const containerClassName = (
        `navigation__container ${links ? 'navigation__container_status_active' : 'navigation__container_status_notactive'}`
    );

    const handleClick = () => {
        links ? setLinks(false) : setLinks(true);
    }

    return (
        <div className={containerClassName}>
            {props.loggedIn ?
                <section className="navigation navigation_loggedin">
                    <button className={buttonClassName} onClick={handleClick}></button>
                    <button className={closeButtonClassName} onClick={handleClick}></button>
                    <ul className={linksClassName}>
                        <li className="navigation__main-link"><Link className="navigation__link navigation__link_loggedin" to="/">Главная</Link></li>
                        <li className="navigation__movies-link"><Link className="navigation__link navigation__link_loggedin" to="/movies">Фильмы</Link></li>
                        <li className="navigation__saved-movies-link"><Link className="navigation__link navigation__link_loggedin" to="/saved-movies">Сохраненные Фильмы</Link></li>
                        <li className="navigation__account-link"><Link className="navigation__link navigation__link_loggedin" to="/profile">Аккаунт<img className="navigation__account-icon" alt="иконка Аккаунт" src={accountIcon}></img></Link></li>
                    </ul>
                </section>
            :
                <>                    
                    <ul className="navigation navigation_notloggedin">
                        <li><Link to="/signup" className="navigation__link navigation__link_notloggedin navigation__link__register">Регистрация</Link></li>
                        <li><Link to="/signin" className="navigation__link navigation__link_notloggedin navigation__link_login">Войти</Link></li>
                    </ul>
                </>
            }
        </div>   
    );
  }
  
  export default Navigation;