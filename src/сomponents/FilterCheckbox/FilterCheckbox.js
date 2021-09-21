import React  from 'react';
import Switch from "react-switch";
import './FilterCheckbox.css';

function FilterCheckbox(props) {

    function handleChange(checked) {
        props.handleChangeCheckbox(checked);
    }

    return (
        <label className="filtercheckbox">
            <Switch
            className="filtercheckbox__switch"
            onChange={handleChange}
            checked={props.isCheckbox.checked}
            offColor="#EBEBEB"
            onColor="#F5C32C"
            offHandleColor="#F5F5F5"
            onHandleColor="#FFFFFF"
            height={20}
            width={36}
            handleDiameter={8}
            uncheckedIcon={false}
            checkedIcon={false}
            />
            <span className="filtercheckbox__caption">Короткометражки</span>
        </label>
    )
  }
  
  export default FilterCheckbox;