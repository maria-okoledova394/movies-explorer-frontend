import React from 'react';
import './Portfolio.css';

function Portfolio() {

    return (
        <section className="portfolio">
            <h2 className="portfolio__title">Портфолио</h2>
            <ul className="portfolio__links">
                <li className="portfolio__link"><a className="portfolio__link-text" href="https://maria-okoledova394.github.io/how-to-learn/" target="_blank">Статичный сайт<span className="portfolio__link-pointer">&#8599;</span></a></li>
                <hr className="portfolio__line"></hr>
                <li className="portfolio__link"><a className="portfolio__link-text" href="https://maria-okoledova394.github.io/russian-travel/" target="_blank">Адаптивный сайт<span className="portfolio__link-pointer">&#8599;</span></a></li>
                <hr className="portfolio__line"></hr>
                <li className="portfolio__link"><a className="portfolio__link-text" href="https://okoledova.students.nomoredomains.club" target="_blank">Одностраничное приложение<span className="portfolio__link-pointer">&#8599;</span></a></li>
            </ul>
        </section>        
    )
}
  
export default Portfolio;