import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../../Component/Navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
  getUserFunction,
  changeUserDataFunction,
  resetStateFunction,
} from '../../redux/user/userReducer';
import './User.css';
import Button from '../../Component/Button/Button';
import PasswordModal from '../../Component/Modal/PasswordModal/PasswordModal';

export default function User() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const ref = useRef();

  const userData = useSelector((state) => state.userReducer.userData);
  const userState = useSelector((state) => state.userReducer.state);
  const userError = useSelector((state) => state.userReducer.error);

  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    dispatch(resetStateFunction());
    setModal(!modal);
  };

  const [user, setUser] = useState(userData ? userData : {});

  //Checking if cookie exist/is valid (by requesting API to gather user). If not clear userReducer state and redirect to login page
  useEffect(() => {
    if (userError === '403: unauthorized request') {
      dispatch(resetStateFunction());
      navigate('/login');
    };
  }, [userError]);

  //Get user after page loaded
  useEffect(() => {
    dispatch(getUserFunction());
  }, []);

  // When userData hook change, set user state to userData
  useEffect(() => {
    const userStateCopy = { ...user };
    const newUserState = Object.assign(userStateCopy, userData);
    setUser(newUserState);
  }, [userData]);

  //Get user after modification and reset userState
  useEffect(() => {
    if (userState == 'Profil modifié !') {
      dispatch(getUserFunction());
      dispatch(resetStateFunction());
    }
  }, [userState]);

  //Data binding beetween state user and form
  const handleInputs = (event) => {
    if (event.target.classList.contains('form-user_picture')) {
      const previewUrl = URL.createObjectURL(event.target.files[0]);
      ref.current.src = previewUrl;
    } else if (event.target.classList.contains('form-user_nickname')) {
      const newUserState = { ...user, nickname: event.target.value };
      setUser(newUserState);
    } else if (event.target.classList.contains('form-user_email')) {
      const newUserState = { ...user, email: event.target.value };
      setUser(newUserState);
    } else if (event.target.classList.contains('form-user_firstname')) {
      const newUserState = { ...user, firstname: event.target.value };
      setUser(newUserState);
    } else if (event.target.classList.contains('form-user_lastname')) {
      const newUserState = { ...user, lastname: event.target.value };
      setUser(newUserState);
    }
  };

  // Send data to reducer and try to request the API
  const submitForm = (event) => {
    event.preventDefault();
    dispatch(changeUserDataFunction(user, event.target[0].files[0]));
  };


  return (
    <div className='user-page'>
      <header className='user-header'>
        <Navbar userData={userData} />
      </header>
      <main>
        {modal && (
          <>
            <PasswordModal />
            <button onClick={toggleModal} className='close-modal password'>
              Fermer
            </button>
          </>
        )}
        <h1>Votre profil</h1>
        <form
          onSubmit={submitForm}
          className='user-form'
          encType='multipart/form-data'
        >
          <div className='user-form_img-container'>
            <label htmlFor='user-picture' className='label-user-input-file'>
              Envi d'une nouvelle photo de profil ?
            </label>
            <input
              onInput={handleInputs}
              type='file'
              id='user-picture'
              className='form-user_picture'
              accept='.jpeg, .jpg, .png'
              name='image'
            />
            <img src={user.pictureUrl} alt='' className='user-img' ref={ref} />
          </div>
          <div className='user-form_data-container'>
            <label htmlFor='user-nickname'>Pseudo</label>
            <input
              onInput={handleInputs}
              type='text'
              value={user.nickname}
              id='user-nickname'
              placeholder='Votre pseudo'
              className='form-user_nickname'
            />
            <label htmlFor='user-email'>Email</label>
            <input
              onInput={handleInputs}
              type='text'
              value={user.email}
              id='user-email'
              placeholder='Votre email'
              className='form-user_email'
            />
            <label htmlFor='user-firstname'>Prénom</label>
            <input
              onInput={handleInputs}
              type='text'
              value={
                !user.firstname
                  ? ''
                  : user.firstname == 'null'
                  ? ''
                  : user.firstname
              }
              id='user-firstname'
              placeholder='Votre prénom'
              className='form-user_firstname'
            />
            <label htmlFor='user-lastname'>Nom</label>
            <input
              onInput={handleInputs}
              type='text'
              value={
                !user.lastname
                  ? ''
                  : user.lastname == 'null'
                  ? ''
                  : user.lastname
              }
              id='user-lastname'
              placeholder='Votre nom'
              className='form-user_lastname'
            />
          </div>
          <div className='user-form_btn-container'>
            <Button
              className='btn-component form-user-button'
              txt='Modifier le profil'
            />
            <button
              onClick={toggleModal}
              type='button'
              className='btn-component form-user-button'
            >
              Modifier le mot de passe
            </button>
            <button type='button' className='btn-component form-user-button'>
              Supprimer
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
