import React from 'react';
import './Footer.css';

function Footer() {

    return (
        <section className="footer">
            <p className="footer__caption">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <hr className="footer__line"></hr>
            <div className="footer__info">
                <p className="footer__date">&copy;2021</p>
                <nav>
                    <ul className="footer__links">
                        <li className="footer__link"><a className="footer__link" href="https://practicum.yandex.ru" target="_blank" rel="noreferrer">Яндекс.Практикум</a></li>
                        <li className="footer__link"><a className="footer__link" href="https://github.com/maria-okoledova394" target="_blank" rel="noreferrer">Github</a></li>
                        <li className="footer__link"><a className="footer__link" href="https://vk.com/okoledova" target="_blank" rel="noreferrer">VK</a></li>
                    </ul>
                </nav>
            </div>
        </section>
    )
  }
  
  export default Footer;