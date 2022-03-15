import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import './FormLogin.css';
import { Link } from 'react-router-dom';

export default function FormLogin() {



  return (
    <div className='form-login-container'>
      <h1 className='form-login-container__title'>Connexion à votre compte</h1>

      <form className='form-login'>
        <label htmlFor='form-login__email'>Adresse email</label>
        <input 
        type='email' 
        id='form-login__email'
        // value=''
        placeholder='Entrez votre email'
        className='form-login__email__input'
        />
        <label htmlFor='form-login__password'>Mot de passe</label>
        <input 
        type='text' 
        id='form-login__password'
        // value=''
        placeholder='Entrez votre mot de passe'
        className='form-login__password__input'
        />

        <button className='login-button'>Connexion</button>
      </form>
      <p>Pas de encore de compte ?</p>
      <Link to=''>Inscription</Link>
    </div>
  )
}
