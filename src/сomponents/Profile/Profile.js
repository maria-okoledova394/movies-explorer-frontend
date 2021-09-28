import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import './Profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const firstTimeRender = useRef(true);
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

    const [isButtonDisabled, setDisabled] = useState(true);
    const [hasFieldChanged, setHasFieldChanged] = useState({
        name: false,
        email: false
    });
    const [validity, setValidity] = useState({
        name: true,
        email: true
    });

    const [isUpdateClick, setIsUpdateClick] = useState(false)

    useEffect(() => {
        if (!firstTimeRender.current) {
            setDisabled(!(validity.name && validity.email && (hasFieldChanged.name || hasFieldChanged.email)))
        }
    }, [validity, hasFieldChanged]);

    useEffect(() => { 
        firstTimeRender.current = false 
      }, [])

    function handleNameChange(e) {
        const data = e.target;
        setNameInput({ value: data.value });

        e.target.validity.valid ? setError({ ...error, name: false }) : setError({ ...error, name:true })
        e.target.validity.valid ? setValidity({ ...validity, name: true }) : setValidity({ ...validity, name: false })
        data.value !== currentUser.name ? setHasFieldChanged({ ...hasFieldChanged, name: true }) : setHasFieldChanged({ ...hasFieldChanged, name: false })
    }

    function handleEmailChange(e) {
        const data = e.target;
        setEmailInput({ value: data.value });

        e.target.validity.valid ? setError({ ...error, email: false }) : setError({ ...error, email:true })
        e.target.validity.valid ? setValidity({ ...validity, email: true }) : setValidity({ ...validity, email: false })
        data.value !== currentUser.email ? setHasFieldChanged({ ...hasFieldChanged, email: true }) : setHasFieldChanged({ ...hasFieldChanged, email: false })
    }

    function checkValidityUpdate(name, email) {
        setError({ 
            name: !name.validity.valid,
            email: !email.validity.valid,
        })
    }

    function handleUpdate(e) {
        e.preventDefault();
        const emailElement = document.getElementById("email-input");
        const nameElement = document.getElementById("name-input");
        checkValidityUpdate(nameElement, emailElement)
        if (emailElement.validity.valid && nameElement.validity.valid) {
            props.onUpdateUserData({
                name: nameInput.value,
                email: emailInput.value
            })
        }
        setIsUpdateClick(true)
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
                <form className="profile__form" noValidate onSubmit={handleUpdate}>
                    <div className="profile__input-container">
                        <input id="name-input" name="name" className="profile__input" value={nameInput.value} onChange={handleNameChange} required minLength="2" pattern="[A-Za-zА-Яа-яЁё\s\-]{2,}" />
                        <label className="profile__label">Имя</label>
                        <span className={errorNameClassName}>Что-то пошло не так...</span>
                    </div>
                    <hr className="profile__line"></hr>
                    <div className="profile__input-container">
                        <input id="email-input" name="email" className="profile__input" value={emailInput.value} onChange={handleEmailChange} required type="email" />
                        <label className="profile__label">E-mail</label>
                        <span className={errorEmailClassName}>Что-то пошло не так...</span>
                    </div>
                    {isUpdateClick ? <p className="profile__result-message">{props.isDataSuccessChanged ? "Данные изменены!" : "Данные не удалось изменить"}</p> : <></>}
                    <button type="submit" className="profile__button profile__button_edit" disabled={isButtonDisabled}>Редактировать</button>
                </form>                
                <button className="profile__button profile__button_exit" onClick={props.onSignOut}><Link to="/" className="profile__link">Выйти из аккаунта</Link></button>
            </section>
        </>
    )
  }

  export default Profile;