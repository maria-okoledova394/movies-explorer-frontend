import React from 'react';
import './SearchForm.css';

function SearchForm() {

    return (
        <form className="searchform">
            <input name="film" className="searchform__input" placeholder="Фильм" type="search"></input>
            <button type="submit" className="searchform__button"></button>      
        </form>
    )
  }
  
  export default SearchForm;