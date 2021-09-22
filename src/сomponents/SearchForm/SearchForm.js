import React, { useState } from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm(props) {
    const [inputData, setInputData] = useState({
        value: ''
    })

    const [errorNameClassName, setErrorNameClassName] = useState('searchform__input-error searchform__input-error_notvisible');

    function handleChange(e) {
        const data = e.target
        setInputData({ value: data.value })
        props.onSetSearchWords(data.value.split(' '))
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (inputData.value === '') {
            setErrorNameClassName(`searchform__input-error searchform__input-error_visible`)
        } else {
            props.onSearchMovies();
            setErrorNameClassName(`searchform__input-error searchform__input-error_notvisible`)
        }
    }

    return (
        <div className="searchform__container">
            <form className="searchform" noValidate onSubmit={handleSubmit}>
                <input name="film" className="searchform__input" placeholder="Фильм" value={inputData.value} onChange={handleChange} required></input>
                <button type="submit" className="searchform__button"></button>      
            </form>
            <span className={errorNameClassName}>Нужно ввести ключевое слово</span>
            <FilterCheckbox handleChangeCheckbox={props.handleChangeCheckbox} isCheckbox={props.isCheckbox} />
            <hr className="searchform__line"></hr>
        </div>
    )
  }
  
  export default SearchForm;