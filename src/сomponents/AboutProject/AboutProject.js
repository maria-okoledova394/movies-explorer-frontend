import React from 'react';
import './AboutProject.css';

function AboutProject() {

    return (
        <section className="aboutproject" id="AboutProject">
            <h2 className="aboutproject__title">О проекте</h2>
            <hr className="aboutproject__line"></hr>
            <div className="aboutproject__info">
                <h3 className="aboutproject__subtitle">Дипломный проект включал 5 этапов</h3>
                <p className="aboutproject__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                <h3 className="aboutproject__subtitle aboutproject__subtitle_weeks">На выполнение диплома ушло 5 недель</h3>
                <p className="aboutproject__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
            </div>
            <div className="aboutproject__timeline">
                <p className="aboutproject__time aboutproject__time_start">1 неделя</p>
                <p className="aboutproject__time aboutproject__time_finish">4 недели</p>
                <p className="aboutproject__caption">Back-end</p>
                <p className="aboutproject__caption">Front-end</p>
            </div>
        </section>
    )
  }
  
  export default AboutProject;