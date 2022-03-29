import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../../Component/Navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useParams } from 'react-router-dom';
import {
  getUserFunction,
  changeUserDataFunction,
  resetStateFunction,
  getUserFunctionById,
  deleteUserFunction,
} from '../../redux/user/userReducer';
import './User.css';
import Button from '../../Component/Button/Button';
import PasswordModal from '../../Component/Modal/PasswordModificationModal/PasswordModal';

export default function User() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();

  const ref = useRef();

  const userData = useSelector((state) => state.userReducer.userData);
  const otherUserData = useSelector((state) => state.userReducer.otherUserData);
  const userState = useSelector((state) => state.userReducer.state);
  const userError = useSelector((state) => state.userReducer.error);

  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    dispatch(resetStateFunction());
    setModal(!modal);
  };

  const [user, setUser] = useState(userData ? userData : {});

  //Get user(s) data after page loaded
  useEffect(() => {
    dispatch(getUserFunction());
    if (id != userData.idUSER) {
      dispatch(getUserFunctionById(id));
    }
  }, []);

  //Checking if cookie exist/is valid. If not clear userReducer state and redirect to login page
  useEffect(() => {
    if (userError === '403: unauthorized request') {
      dispatch(resetStateFunction());
      navigate('/login');
    }
  }, [userError]);

  // When userData from reducer change, set user state to userData
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
    if (userState == 'Utilisateur Supprimé') {
      navigate('/login');
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

  
  const submitForm = (event) => {
    event.preventDefault();
    dispatch(changeUserDataFunction(user, event.target[0].files[0]));
  };

  const deleteUser = () => {
    const answer = window.confirm(
      "Etes vous sûr de vouloir supprimer l'utilisateur ?"
    );
    if (answer) {
      dispatch(deleteUserFunction(id));
    }
  };

  return (
    <div className='user-page'>
      <header className='user-header'>
        <Navbar userData={userData} />
      </header>
      <main>
        {/* IF USER VISITE HIS PROFILE OR IF HE IS ADMIN */}

        {id == userData.idUSER || userData.isAdmin == 1 ? (
          <>
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
              className='user_container'
              encType='multipart/form-data'
            >
              <div className='user_img-container'>
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
                <img
                  src={user.pictureUrl}
                  alt=''
                  className='user-img'
                  ref={ref}
                />
              </div>
              <div className='user_data-container'>
                <label htmlFor='user-nickname'>Pseudo</label>
                <input
                  onInput={handleInputs}
                  type='text'
                  value={user.nickname ? user.nickname : ''}
                  id='user-nickname'
                  placeholder='Votre pseudo'
                  className='form-user_nickname'
                />
                <label htmlFor='user-email'>Email</label>
                <input
                  onInput={handleInputs}
                  type='text'
                  value={user.email ? user.email : ''}
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
                <button
                  onClick={deleteUser}
                  type='button'
                  className='btn-component form-user-button'
                >
                  Supprimer
                </button>
              </div>
            </form>

            {/* IF USER VISITE ANOTHER PROFILE AND IS NOT ADMIN */}
          </>
        ) : (
          <>
            <h1>Profil de {otherUserData.nickname}</h1>
            <div className='user_container'>
              <div className='user_img-container'>
                <img
                  src={otherUserData.pictureUrl}
                  alt=''
                  className='user-img'
                  ref={ref}
                />
              </div>
              <div className='user_data-container'>
                <p className='user_data-title'>Prénom</p>
                <p className='user_data-content'>
                  {otherUserData.firstname
                    ? otherUserData.firstname
                    : 'Non renseigné'}
                </p>
                <p className='user_data-title'>Nom</p>
                <p className='user_data-content'>
                  {otherUserData.lastname
                    ? otherUserData.firstname
                    : 'Non renseigné'}
                </p>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
