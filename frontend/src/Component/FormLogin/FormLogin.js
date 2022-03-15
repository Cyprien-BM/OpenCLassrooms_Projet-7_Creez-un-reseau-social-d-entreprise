import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './FormLogin.css';
import { Link } from 'react-router-dom';
import { loginFunction } from '../../redux/login/loginReducer';
import { useNavigate } from 'react-router-dom';

export default function FormLogin() {

  const navigate = useNavigate();

  const loginState = useSelector(state => ({
    ...state.loginReducer
  }));

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  // Send data to reducer and try to request the API
  const submitForm = (event) => {
    event.preventDefault();
    if (user.email && user.password) {
      dispatch(loginFunction(user));
    } else {
      console.log('non');
    }
  };

  //Checking if we received user data from API, if yes : redirect to page /home
  useEffect(() => {
    if (loginState.userData) {
      navigate('/home');
    }
  })

  const handleInputs = (event) => {
    if (event.target.classList.contains('form-login__email__input')) {
      const newUserState = { ...user, email: event.target.value };
      setUser(newUserState);
    } else if (event.target.classList.contains('form-login__password__input')) {
      const newUserState = { ...user, password: event.target.value };
      setUser(newUserState);
    }
  };

  return (
    <div className='form-login-container'>
      <h1 className='form-login-container__title'>Connexion à votre compte</h1>

      <form onSubmit={submitForm} className='form-login'>
        <label htmlFor='form-login__email'>Adresse email</label>
        <input
        onInput={handleInputs}
          type='email'
          id='form-login__email'
          value={user.email}
          placeholder='Entrez votre email'
          className='form-login__email__input'
        />
        <label htmlFor='form-login__password'>Mot de passe</label>
        <input
        onInput={handleInputs}
          type='text'
          id='form-login__password'
          value={user.password}
          placeholder='Entrez votre mot de passe'
          className='form-login__password__input'
        />

        <button className='login-button'>Connexion</button>
      </form>
      <p>Pas de encore de compte ?</p>
      <Link to=''>Inscription</Link>
    </div>
  );
}
