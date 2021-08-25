import React from 'react';
import './AboutMe.css';
import myPhoto from '../../images/my-photo.png';
import Portfolio from '../Portfolio/Portfolio';

function AboutMe() {

    return (
        <section className="aboutme">
            <h2 className="aboutme__title">Студент</h2>
            <hr className="aboutme__line"></hr>
            <div className="aboutme__info">
                <div className="aboutme__text-column">
                    <h3 className="aboutme__subtitle">Мария</h3>
                    <p className="aboutme__caption">Студентка, 20 лет</p>
                    <p className="aboutme__text">Это не моя фотография
                    </p>
                    <ul className="aboutme__links">
                        <li className="aboutme__link"><a className="aboutme__link" href="https://vk.com/okoledova" target="_blank">VK</a></li>
                        <li className="aboutme__link"><a className="aboutme__link" href="https://github.com/maria-okoledova394" target="_blank">Github</a></li>
                    </ul>
                </div>
                <img className="aboutme__photo" alt="мое фото" src={myPhoto} />
            </div>
            <Portfolio />
        </section>
    )
  }
  
  export default AboutMe;