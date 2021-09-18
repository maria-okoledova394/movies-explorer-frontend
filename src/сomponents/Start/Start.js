import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Start.css';

function Start(props) {

    const [error, setError] = useState({
        name: false,
        email: false,
        password: false,
    });

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const errorNameClassName = (
        `start__input-error ${error.name ? 'start__input-error_visible' : 'start__input-error_notvisible'}`
    );
    const errorEmailClassName = (
        `start__input-error ${error.email ? 'start__input-error_visible' : 'start__input-error_notvisible'}`
    );
    const errorPasswordClassName = (
        `start__input-error ${error.password ? 'start__input-error_visible' : 'start__input-error_notvisible'}`
    );

    function handleChange(e) {
        const { name, value } = e.target;
        setUserData({
          ...userData,
          [name]: value
        });

        e.target.validity.valid ? setError({ ...error, [name]: false }) : setError({ ...error, [name]:true })
      }

    function handleSubmit(e) {
        e.preventDefault();
        if (props.register) {
            const { name, email, password } = userData;
            props.onSubmit({ name, email, password })
        } else {
            const { email, password } = userData;
            props.onSubmit({ email, password })
        }
    }

    return (
        <section className="start">
            <Link className="start__logo" alt="Логотип" to="/"></Link>
            <h1 className="start__title">{props.register ? "Добро пожаловать!": "Рады видеть!"}</h1>
            <form className="start__form" noValidate onSubmit={handleSubmit}>
                {props.register
                ?
                    <>
                    <label className="start__placeholder">Имя</label>
                    <input id="name-input" name="name" className="start__input" value={userData.name} onChange={handleChange} required />
                    <span className={errorNameClassName}>Что-то пошло не так...</span>
                    </>
                :
                    <></>
                }
                <label className="start__placeholder">E-mail</label>
                <input id="email-input" name="email" className="start__input" value={userData.email} onChange={handleChange} required />
                <span className={errorEmailClassName}>Что-то пошло не так...</span>
                <label className="start__placeholder">Пароль</label>
                <input id="password-input" name="password" type="password" className="start__input" value={userData.password} onChange={handleChange} required />
                <span className={errorPasswordClassName}>Что-то пошло не так...</span>
                <button type="submit" className="start__button">{props.register ? "Зарегистрироваться": "Войти"}</button>
            </form>
            <p className="start__login-caprion">{props.register ? "Уже зарегистрированы?": "Ещё не зарегистрированы?"} <Link to={props.register ? "/signin": "/signup"} className="start__login-link">{props.register ? "Войти": "Регстрация"}</Link></p>
        </section>
    )
}

export default Start;