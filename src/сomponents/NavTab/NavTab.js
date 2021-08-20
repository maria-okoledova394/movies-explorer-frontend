import React from 'react';
import './NavTab.css';

function NavTab() {

    return (
        <div className="navtab__container">
            <ul className="navtab">
                <li><a className="navtab__link" href="#">О проекте</a></li>
                <li><a className="navtab__link" href="#">Технологии</a></li>
                <li><a className="navtab__link" href="#">Студент</a></li>
            </ul>
        </div>
    )
  }
  
  export default NavTab;