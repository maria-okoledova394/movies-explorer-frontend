import React from 'react';
import './NavTab.css';
import { HashLink as Link } from 'react-router-hash-link';

function NavTab() {

    return (
        <div className="navtab__container">
            <ul className="navtab">
                <li><Link className="navtab__link" to="/#AboutProject">О проекте</Link></li>
                <li><Link className="navtab__link" href="#" to="/#Techs">Технологии</Link></li>
                <li><Link className="navtab__link" href="#" to="/#AboutMe">Студент</Link></li>
            </ul>
        </div>
    )
  }
  
  export default NavTab;