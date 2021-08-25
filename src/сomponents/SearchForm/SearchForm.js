import React, { useState } from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
    const [inputData, setInputData] = useState({
        value: ''
    });

    function handleChange(e) {
        const data = e.target;
        setInputData({ value: data.value });
    }

    return (
        <div className="searchform__container">
            <form className="searchform">
                <input name="film" className="searchform__input" placeholder="Фильм" value={inputData.value} onChange={handleChange}></input>
                <button type="submit" className="searchform__button"></button>      
            </form>
            <FilterCheckbox />
            <hr className="searchform__line"></hr>
        </div>
    )
  }
  
  export default SearchForm;