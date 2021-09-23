import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Start.css';

function Start(props) {
    const firstTimeRender = useRef(true);
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
    const [disabled, setDisabled] = useState(true);
    const [validity, setValidity] = useState({
        name: false,
        email: false,
        password: false,
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

    useEffect(() => {
        if (!firstTimeRender.current && props.register) {
            setDisabled(!(validity.name && validity.email && validity.password))
        } else if(!firstTimeRender.current) {
            setDisabled(!(validity.email && validity.password))
        }
    }, [validity]);

    useEffect(() => { 
        firstTimeRender.current = false
      }, [])

    function handleChange(e) {
        const { name, value } = e.target;
        setUserData({
          ...userData,
          [name]: value
        });
        
        e.target.validity.valid ? setError({ ...error, [name]: false }) : setError({ ...error, [name]:true })
        e.target.validity.valid ? setValidity({ ...validity, [name]: true }) : setValidity({ ...validity, [name]: false })
    }

    function checkValidityLogin(email, password) {
        setError({ 
            ...error,
            email: !email.validity.valid,
            password: !password.validity.valid
        })
    }

    function checkValidityRegister(name, email, password) {
        setError({ 
            name: !name.validity.valid,
            email: !email.validity.valid,
            password: !password.validity.valid
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        const emailElement = document.getElementById("email-input-start");
        const nameElement = document.getElementById("name-input-start");
        const passwordElement = document.getElementById("password-input-start");

        if (props.register) {
            checkValidityRegister(nameElement, emailElement, passwordElement)
            const { name, email, password } = userData;
            if (emailElement.validity.valid && passwordElement.validity.valid && nameElement.validity.valid) {
                props.onSubmit({ name, email, password })
            }
        } else {
            checkValidityLogin(emailElement, passwordElement)
            const { email, password } = userData;
            if (emailElement.validity.valid && passwordElement.validity.valid) { props.onSubmit({ email, password }) }
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
                    <input id="name-input-start" name="name" className="start__input" value={userData.name} onChange={handleChange} required minLength="2" pattern="[A-Za-zА-Яа-яЁё\s\-]{2,}" />
                    <span className={errorNameClassName}>Введите корректное имя </span>
                    </>
                :
                    <></>
                }
                <label className="start__placeholder">E-mail</label>
                <input id="email-input-start" name="email" className="start__input" value={userData.email} onChange={handleChange} required type="email" />
                <span className={errorEmailClassName}>Введите e-mail</span>
                <label className="start__placeholder">Пароль</label>
                <input id="password-input-start" name="password" type="password" className="start__input" value={userData.password} onChange={handleChange} required minLength="2" />
                <span className={errorPasswordClassName}>Введите пароль длиной более двух символов</span>
                {props.mistakeMessage === "" ? <></> : <p className="start__error-message">{props.mistakeMessage}</p>}
                <button type="submit" className="start__button" disabled={disabled}>{props.register ? "Зарегистрироваться": "Войти"}</button>
            </form>
            <p className="start__login-caprion">{props.register ? "Уже зарегистрированы?": "Ещё не зарегистрированы?"} <Link to={props.register ? "/signin": "/signup"} className="start__login-link">{props.register ? "Войти": "Регстрация"}</Link></p>
        </section>
    )
}

export default Start;