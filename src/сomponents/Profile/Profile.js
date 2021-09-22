import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import './Profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [nameInput, setNameInput] = useState({
        value: currentUser.name
    });
    const [emailInput, setEmailInput] = useState({
        value: currentUser.email
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

    function handleUodate(e) {
        e.preventDefault();
        props.onUpdateUserData({
            name: nameInput.value,
            email: emailInput.value
        })
    }

    const errorNameClassName = (
        `profile__input-error ${error.name ? 'profile__input-error_visible' : 'profile__input-error_notvisible'}`
    );
    const errorEmailClassName = (
        `profile__input-error ${error.email ? 'profile__input-error_visible' : 'profile__input-error_notvisible'}`
    );

    return (
        <>
            <Header loggedIn={true} onSignOut={props.onSignOut} />
            <section className="profile">
                <h1 className="profile__title">Привет, {currentUser.name}!</h1>
                <form className="profile__form" noValidate onSubmit={handleUodate}>
                    <div className="profile__input-container">
                        <input id="name-input" name="name" className="profile__input" value={nameInput.value} onChange={handleNameChange} required />
                        <label className="profile__label">Имя</label>
                        <span className={errorNameClassName}>Что-то пошло не так...</span>
                    </div>                                        
                    <hr className="profile__line"></hr>
                    <div className="profile__input-container">
                        <input id="email-input" name="email" className="profile__input" value={emailInput.value} onChange={handleEmailChange} required />
                        <label className="profile__label">E-mail</label>
                        <span className={errorEmailClassName}>Что-то пошло не так...</span>
                    </div>
                    <button type="submit" className="profile__button profile__button_edit">Редактировать</button>
                </form>
                <button className="profile__button profile__button_exit" onClick={props.onSignOut}><Link to="/" className="profile__link">Выйти из аккаунта</Link></button>
            </section>
        </>
    )
  }
  // placeholder="Имя"
  export default Profile;