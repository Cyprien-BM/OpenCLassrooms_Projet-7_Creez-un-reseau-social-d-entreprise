import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './FormLoginRegister.css';
import { Link } from 'react-router-dom';
import { registerFunction } from '../../redux/user/userReducer';
import { useNavigate } from 'react-router-dom';
import ModalPassword from '../Modal/RegisterModal/RegisterModal';
import Button from '../Button/Button';

export default function FormLogin() {
  const navigate = useNavigate();

  const registerState = useSelector(state => state.userReducer);

  const [user, setUser] = useState({
    email: '',
    password: '',
    nickname: '',
  });

  const [error, setError] = useState();

  const dispatch = useDispatch();

  // Send data to reducer and try to request the API
  const submitForm = (event) => {
    event.preventDefault();
    if (user.email && user.password && user.nickname) {
      dispatch(registerFunction(user));
    }
  };

  //Checking if we received user data from API, if yes : redirect to page /login
  useEffect(() => {
    if (
      registerState.status.message === 'Utilisateur créé'
    ) {
      setError();
      navigate('/login')
    } else if (registerState.error) {
      setError(registerState.error);
    }
  }, [registerState]);

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
    <main className='form-container register'>
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
        <ModalPassword />
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
          onInput={handleInputs}
          type='text'
          id='form-log-reg__nickname'
          value={user.nickname}
          placeholder='Entrez votre pseudo'
          className='form-log-reg__nickname__input'
        />
        <div className='form-log-reg__error-container'>
          <p className='form-error'>{error}</p>
        </div>
        <Button className='btn-component form-log-reg-button' txt='Inscription' />
      </form>
      <p className='form-log-reg-container__footer'>Déjà inscrit ?</p>
      <Link to='/login'>Connexion</Link>
    </main>
  );
}
