import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../../Component/Navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserFunction,
  changeUserDataFunction,
} from '../../redux/user/userReducer';
import './User.css';

export default function User() {
  const dispatch = useDispatch();

  const ref = useRef();

  const userData = useSelector((state) => state.userReducer.userData);
  const userState = useSelector((state) => state.userReducer.state);

  const [user, setUser] = useState(userData && userData);

  useEffect(() => {
    dispatch(getUserFunction());
  }, []);

  useEffect(() => {
    setUser(userData && userData);
  }, [userData]);

  useEffect(() => {
    if (userState == 'Profil modifié !') {
      dispatch(getUserFunction());
    }
  }, [userState]);

  console.log(userState);

  const handleInputs = (event) => {
    if (event.target.classList.contains('form-user_picture')) {
      const previewUrl = URL.createObjectURL(event.target.files[0]);
      ref.current.src = previewUrl;
      // const newUserState = { ...user, pictureUrl: event.target.files[0] };
      // setUser(newUserState);
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
        <h1>Votre profil</h1>
        <form
          onSubmit={submitForm}
          className='user-form'
          encType='multipart/form-data'
        >
          <div className='user-form_img-container'>
            <label htmlFor='user-picture'>Changer votre photo de profil</label>
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
                user.firstname & (user.firstname != 'null')
                  ? user.firstname
                  : ''
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
                user.lastname & (user.lastname != 'null') ? user.lastname : ''
              }
              id='user-lastname'
              placeholder='Votre nom'
              className='form-user_lastname'
            />
          </div>
          <div className='user-form_btn-container'>
            <button className='form-user-btn_change-data'>
              Modifier votre profil
            </button>
            <button type='button'>Supprimer le profil</button>
          </div>
        </form>
      </main>
    </div>
  );
}
