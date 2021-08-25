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
                <input name="film" className="searchform__input" placeholder="Фильм" type="search" value={inputData.value} onChange={handleChange}></input>
                <button type="submit" className="searchform__button"></button>      
            </form>

            <FilterCheckbox />
        </div>
    )
  }
  
  export default SearchForm;