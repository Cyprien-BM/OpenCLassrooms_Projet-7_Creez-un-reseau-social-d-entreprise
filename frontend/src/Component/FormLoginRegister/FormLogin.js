import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './FormLoginRegister.css';
import { loginFunction } from '../../redux/user/userReducer';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../Button/Button';

export default function FormLogin() {
  const navigate = useNavigate();

  const loginState = useSelector((state) => state.userReducer);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState();

  const dispatch = useDispatch();

  // Clear user-error on page load
  useEffect(() => {
    dispatch({ type: 'USER-ERROR' });
  }, []);
  //-------------------------------------------------------//

  //Checking if we received user data from API, if yes : redirect to page /home
  useEffect(() => {
    if (loginState.status === 'Utilisateur connecté') {
      setError();
      navigate('/home');
    } else if (loginState.error) {
      setError(loginState.error);
    }
  }, [loginState, navigate]);
  //-------------------------------------------------------//

  //Data binding beetween state user and form
  const handleInputs = (event) => {
    if (event.target.classList.contains('form-log-reg_email-input')) {
      const newUserState = { ...user, email: event.target.value };
      setUser(newUserState);
    } else if (event.target.classList.contains('form-log-reg_password-input')) {
      const newUserState = { ...user, password: event.target.value };
      setUser(newUserState);
    }
  };
  //-------------------------------------------------------//

  // Connection
  const submitForm = (event) => {
    event.preventDefault();
    if (user.email && user.password) {
      dispatch(loginFunction(user));
    } else setError('Veuillez remplir tous les champs');
  };
  //-------------------------------------------------------//

  return (
    <main className='form-container login'>
      <h1 className='form-log-reg-container_title'>Connexion à votre compte</h1>

      <form onSubmit={submitForm} className='form-log-reg'>
        <label htmlFor='form-log-reg_email'>Adresse email</label>
        <input
          onInput={handleInputs}
          type='email'
          id='form-log-reg_email'
          value={user.email}
          placeholder='Entrez votre email'
          className='form-log-reg_email-input'
        />
        <label htmlFor='form-log-reg_password'>Mot de passe</label>
        <input
          onInput={handleInputs}
          type='password'
          id='form-log-reg_password'
          value={user.password}
          placeholder='Entrez votre mot de passe'
          className='form-log-reg_password-input'
        />
        <div className='form-log-reg_error-container'>
          <p className='form-error'>{error}</p>
        </div>
        <Button className='btn-component form-log-reg-button' txt='Connexion' />
      </form>
      <div className='form-log-reg-container_footer-container'>
        <p className='form-log-reg-container_footer'>
          Pas de encore de compte ?
        </p>
        <Link to='/register'>Inscription</Link>
      </div>
    </main>
  );
}
