import React from 'react';
import Start from '../Start/Start';

function Register(props) {

    return (
        <Start register={true} onSubmit={props.onSubmit} />
    )
}
  
  export default Register;