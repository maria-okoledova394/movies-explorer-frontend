import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Start.css';

function Start(props) {
    const [nameInput, setNameInput] = useState({
        value: ''
    });

    const [emailInput, setEmailInput] = useState({
        value: ''
    });

    const [passwordInput, setPasswordInput] = useState({
        value: ''
    });

    const [error, setError] = useState({
        name: false,
        email: false,
        password: false,
    });

    function handleNameChange(e) {
        const data = e.target;
        setNameInput({ value: data.value });

        e.target.validity.valid ? setError({ ...error, name: false }) : setError({ ...error, name:true })
    }

    function handleEmailChange(e) {
        const data = e.target;
        setEmailInput({ value: data.value });

        e.target.validity.valid ? setError({ ...error, email: false }) : setError({ ...error, email:true })
    }

    function handlePasswordChange(e) {
        const data = e.target;
        setPasswordInput({ value: data.value });

        e.target.validity.valid ? setError({ ...error, password: false }) : setError({ ...error, password:true })
    }

    const errorNameClassName = (
        `start__input-error ${error.name ? 'start__input-error_visible' : 'start__input-error_notvisible'}`
    );
    const errorEmailClassName = (
        `start__input-error ${error.email ? 'start__input-error_visible' : 'start__input-error_notvisible'}`
    );
    const errorPasswordClassName = (
        `start__input-error ${error.password ? 'start__input-error_visible' : 'start__input-error_notvisible'}`
    );

    return (
        <section className="start">
            <Link className="start__logo" alt="Логотип" to="/"></Link>
            <h1 className="start__title">{props.register ? "Добро пожаловать!": "Рады видеть!"}</h1>
            <form className="start__form" noValidate>
                <label className="start__placeholder">Имя</label>
                <input id="name-input" name="name" className="start__input" value={nameInput.value} onChange={handleNameChange} required />
                <span className={errorNameClassName}>Что-то пошло не так...</span>
                <label className="start__placeholder">E-mail</label>
                <input id="email-input" name="email" className="start__input" value={emailInput.value} onChange={handleEmailChange} required />
                <span className={errorEmailClassName}>Что-то пошло не так...</span>
                {props.register
                ?
                    <>
                    <label className="start__placeholder">Пароль</label>
                    <input id="password-input" name="password" type="password" className="start__input" value={passwordInput.value} onChange={handlePasswordChange} required />
                    <span className={errorPasswordClassName}>Что-то пошло не так...</span>
                    </>
                :
                    <></>
                }
                <button type="submit" className="start__button">{props.register ? "Зарегистрироваться": "Войти"}</button>
            </form>
            <p className="start__login-caprion">{props.register ? "Уже зарегистрированы?": "Ещё не зарегистрированы?"} <Link to={props.register ? "/signin": "/signup"} className="start__login-link">{props.register ? "Войти": "Регстрация"}</Link></p>
        </section>
    )
  }
  
  export default Start;