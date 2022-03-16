import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './FormLoginRegister.css';
import { Link } from 'react-router-dom';
import { loginFunction } from '../../redux/login/loginReducer';
import { useNavigate } from 'react-router-dom';

export default function FormLogin(props) {
  const navigate = useNavigate();

  const registerState = useSelector((state) => state.login);

  const [user, setUser] = useState({
    email: '',
    password: '',
    nickname: ''
  });

  const [error, setError] = useState();

  const dispatch = useDispatch();

  // Send data to reducer and try to request the API
  const submitForm = (event) => {
    event.preventDefault();
    if (user.email && user.password) {
    } else {
    }
  };

  //Checking if we received user data from API, if yes : redirect to page /login
  // useEffect(() => {
  //   if (false) {
  //     setError();
  //     navigate('/login');
  //   } else if (loginState.state.error) {
  //     setError(loginState.state.error);
  //   }
  // });

  const handleInputs = (event) => {
    if (event.target.classList.contains('form-log-reg__email__input')) {
      const newUserState = { ...user, email: event.target.value };
      setUser(newUserState);
    } else if (
      event.target.classList.contains('form-log-reg__password__input')
    ) {
      const newUserState = { ...user, password: event.target.value };
      setUser(newUserState);
    } else if (
      event.target.classList.contains('form-log-reg__nickname__input')
    ) {
      const newUserState = { ...user, nickname: event.target.value };
      setUser(newUserState);
    }
  };

  return (
    <div className='form-log-reg-container'>
      <h1 className='form-log-reg-container__title'>Inscrivez-vous</h1>

      <form onSubmit={submitForm} className='form-log-reg'>

        <label htmlFor='form-log-reg__email'>Adresse email</label>
        <input
          onInput={handleInputs}
          type='email'
          id='form-log-reg__email'
          value={user.email}
          placeholder='Entrez votre email'
          className='form-log-reg__email__input'
        />

        <label htmlFor='form-log-reg__password'>Mot de passe</label>
        <input
          onInput={handleInputs}
          type='password'
          id='form-log-reg__password'
          value={user.password}
          placeholder='Entrez votre mot de passe'
          className='form-log-reg__password__input'
        />

        <label htmlFor='form-log-reg__nickname'>Pseudo</label>
        <input
          type='text'
          id='form-log-reg__nickname'
          value={user.nickname}
          placeholder='Entrez votre pseudo'
          className='form-log-reg__nickname__input'
        />
        <div className='form-log-reg__error-container'>
          <p className='form-log-reg__error'>{error}</p>
        </div>
        <button className='log-reg__button'>Inscription</button>
      </form>
      <p className='form-log-reg-container__footer'>Déjà inscrit ?</p>
      <Link to='/login'>Connexion</Link>
    </div>
  );
}
