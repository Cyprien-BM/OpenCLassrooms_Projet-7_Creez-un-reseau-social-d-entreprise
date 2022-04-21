import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../../Component/Navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  getUserFunction,
  changeUserDataFunction,
  resetStateFunction,
  getUserFunctionById,
  deleteUserFunction,
  deleteUserImageFunction,
} from '../../redux/user/userReducer';
import { getAllPostsFunction } from '../../redux/posts/postReducer';
import { getAllComments } from '../../redux/comments/commentsReducer';
import './User.css';
import Button from '../../Component/Button/Button';
import PasswordModal from '../../Component/Modal/PasswordModificationModal/PasswordModal';

export default function User() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  console.log(id);

  const ref = useRef();

  const userData = useSelector((state) => state.userReducer.userData);
  const otherUserData = useSelector((state) => state.userReducer.otherUserData);
  const userState = useSelector((state) => state.userReducer.status);
  const userError = useSelector((state) => state.userReducer.error);

  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    dispatch(resetStateFunction());
    setModal(!modal);
  };

  const [user, setUser] = useState(userData && userData);

  //Get user(s) data after page load
  useEffect(() => {
    dispatch(getUserFunction());
    if (parseInt(id) !== userData.idUSER) {
      dispatch(getUserFunctionById(id));
    } else {
      const newUserState = { ...user, ...userData };
      setUser(newUserState);
    }
  }, []);
  //----------------------------------------------//

  //Change user data when id URL change
  useEffect(() => {
    dispatch(getUserFunction());
    if (parseInt(id) !== userData.idUSER) {
      dispatch(getUserFunctionById(id));
    } else {
      const newUserState = { ...user, ...userData };
      setUser(newUserState);
    }
  }, [id]);
  //----------------------------------------------//

  // Get correct user data when admin visit user page
  useEffect(() => {
    if (parseInt(id) !== userData.idUSER) {
      const newUserState = { ...user, ...otherUserData };
      setUser(newUserState);
    }
  }, [otherUserData]);
  // ----------------------------------------------//

  console.log(parseInt(id) !== userData.idUSER);

  //Checking if cookie exist/is valid. If not : clear userReducer state and redirect to login page
  useEffect(() => {
    if (userError === '403: unauthorized request') {
      dispatch(resetStateFunction());
      navigate('/login');
    }
  }, [userError, dispatch, navigate]);
  //----------------------------------------------//

  //Update States after modification, navigate to login if user deleted
  useEffect(() => {
    if (userState === 'Profil modifié !' || userState === 'Image supprimé') {
      if (parseInt(id) !== userData.idUSER) {
        dispatch(getUserFunctionById(id));
      } else {
        dispatch(getUserFunction());
      }
      dispatch(getAllPostsFunction());
      dispatch(getAllComments());
      dispatch(resetStateFunction());
    }
    if (userState === 'Utilisateur Supprimé') {
      dispatch({ type: 'RESET-STATE', payload: '' });
      if (userData.isAdmin === 1) {
        dispatch(getAllPostsFunction());
        navigate('/home');
      } else {
        navigate('/login');
      }
    }
  }, [userState, dispatch, navigate]);
  //----------------------------------------------//

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
  //----------------------------------------------//

  // Modify / Delete user
  const submitForm = (event) => {
    event.preventDefault();
    dispatch(changeUserDataFunction(user, event.target[0].files[0], id));
  };

  const deleteUser = () => {
    const answer = window.confirm(
      "Etes vous sûr de vouloir supprimer l'utilisateur ?"
    );
    if (answer) {
      dispatch(deleteUserFunction(id, userData.isAdmin));
    }
  };

  const deleteImage = () => {
    const answer = window.confirm(
      'Etes vous sûr de vouloir supprimer la photo de profil ?'
    );
    if (answer) {
      dispatch(deleteUserImageFunction(id));
    }
  };
  //----------------------------------------------//

  console.log(user);

  return (
    <div className='user-page'>
      <header className='user-header'>
        <Navbar userData={userData} />
      </header>
      <main>
        {/* IF USER VISITE HIS PROFILE OR IF HE IS ADMIN */}

        {parseInt(id) === userData.idUSER || userData.isAdmin === 1 ? (
          <>
            {modal && (
              <>
                <PasswordModal id={id} />
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
                <button
                  onClick={deleteImage}
                  type='button'
                  className='btn-component form-user-button'
                >
                  Supprimer la photo
                </button>
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
                      : user.firstname === 'null'
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
                      : user.lastname === 'null'
                      ? ''
                      : user.lastname
                  }
                  id='user-lastname'
                  placeholder='Votre nom'
                  className='form-user_lastname'
                />
              </div>
              <div className='user-form_btn-container'>
                {userError ? (
                  <p className='user-modification_error'>{userError}</p>
                ) : (
                  ''
                )}
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
                {userData.isAdmin === 1 && (
                  <Link className='users-link' to={`/users`}>
                    <button
                      type='button'
                      className='btn-component form-user-button'
                    >
                      Liste d'utilisateurs
                    </button>
                  </Link>
                )}
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
                    ? otherUserData.lastname
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
