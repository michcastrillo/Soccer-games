import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Login.css';

const objInicial = {
    name: "",
    mail: "",
    pass: "",
    conpass: ""
}

const Registro = () => {
    const [formulario, setFormulario] = useState(objInicial);
    const navigate = useNavigate();

    
    const hanbleForm = (e) => {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value
        });
    }

    const handleClick = (e) => {
        e.preventDefault();
        console.log(formulario.name,formulario.mail,formulario.pass,formulario.conpass)

        axios.post("https://cors-anywhere.herokuapp.com/http://api.cup2022.ir/api/v1/user", {
            name : formulario.name,
            email: formulario.mail,
            password: formulario.pass,
            passwordConfirm: formulario.conpass
        },{
          headers:{
            'Content-Type': 'application/json'
          }
        })
        .then((res) => {
          console.log(res.status);
          console.log(res.data.data.token); //get token
          sessionStorage.setItem("registerToken", JSON.stringify(res.data.data.token));
          sessionStorage.setItem("nameUser", JSON.stringify(formulario.name));
          console.log("Server response: ", res);
          navigate('/login');


        })
        .catch((err) => {
            console.log("Server respondend with error: ", err);
        })
    }

  return (
    <div className="wrapper">
    <form>
        <h2 className='txtLR'>Sign up</h2>
        <fieldset>
        <label className='txtLR' htmlFor='name'>Name: </label>
        <input type='text' id='name' name='name' onChange={hanbleForm}></input>
        <label className='txtLR' htmlFor='mail'>Email: </label>
        <input type='email' id='mail' name='mail' onChange={hanbleForm}></input>
        <label className='txtLR' htmlFor='pass'>Password:</label>
        <input type='password' id='pass' name='pass' onChange={hanbleForm}></input>
        <label className='txtLR' htmlFor='conpass'>Confirm password:</label>
        <input type='password' id='conpass' name='conpass' onChange={hanbleForm}></input>
        </fieldset>
        <button onClick={handleClick}>Create account</button>
    </form>
    </div>
  )
}

export default Registro