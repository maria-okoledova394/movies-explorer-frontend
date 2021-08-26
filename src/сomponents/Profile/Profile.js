import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import './Profile.css';

function Profile() {
    const [nameInput, setNameInput] = useState({
        value: ''
    });

    const [emailInput, setEmailInput] = useState({
        value: ''
    });

    const [error, setError] = useState({
        name: false,
        email: false
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

    const errorNameClassName = (
        `profile__input-error ${error.name ? 'profile__input-error_visible' : 'profile__input-error_notvisible'}`
    );
    const errorEmailClassName = (
        `profile__input-error ${error.email ? 'profile__input-error_visible' : 'profile__input-error_notvisible'}`
    );

    return (
        <>
            <Header loggedIn={true} />
            <section className="profile">
                <h1 className="profile__title">Привет, Мария!</h1>
                <form className="profile__form" noValidate>
                    <input id="name-input" placeholder="Имя" name="name" className="profile__input" value={nameInput.value} onChange={handleNameChange} required />
                    <span className={errorNameClassName}>Что-то пошло не так...</span>
                    <hr className="profile__line"></hr>
                    <input id="email-input" name="email" placeholder="E-mail" className="profile__input" value={emailInput.value} onChange={handleEmailChange} required />
                    <span className={errorEmailClassName}>Что-то пошло не так...</span>
                    <button type="submit" className="profile__button profile__button_edit">Редактировать</button>
                </form>
                <button className="profile__button profile__button_exit"><Link to="/main" className="profile__link">Выйти из аккаунта</Link></button>
            </section>
        </>
    )
  }
  
  export default Profile;