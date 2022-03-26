import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './FormLoginRegister.css';
import { loginFunction } from '../../redux/user/userReducer';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../Button/Button';


export default function FormLogin() {
  const navigate = useNavigate();

  const loginState = useSelector(state => state.userReducer);
  

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState();

  const dispatch = useDispatch();

  //Checking if we received user data from API, if yes : redirect to page /home
  useEffect(() => {
    if (
      loginState.state == 'Utilisateur connecté'
    ) {
      setError();
      navigate('/home')
    } else if (loginState.error) {
      setError(loginState.error);
    }
  }, [loginState]);

  const handleInputs = (event) => {
    if (event.target.classList.contains('form-log-reg__email__input')) {
      const newUserState = { ...user, email: event.target.value };
      setUser(newUserState);
    } else if (event.target.classList.contains('form-log-reg__password__input')) {
      const newUserState = { ...user, password: event.target.value };
      setUser(newUserState);
    }
  };

    // Send data to reducer and try to request the API
    const submitForm = (event) => {
      event.preventDefault();
      if (user.email && user.password) {
        dispatch(loginFunction(user));
      }
    };

  return (
    <main className='form-container login'>
      <h1 className='form-log-reg-container__title'>Connexion à votre compte</h1>

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
        <div className='form-log-reg__error-container'>
          <p className='form-error'>{error}</p>
        </div>
        <Button className='btn-component form-log-reg-button' txt='Connexion' />
      </form>
      <p className='form-log-reg-container__footer'>Pas de encore de compte ?</p>
      <Link to='/register'>Inscription</Link>
    </main>
  );
}
