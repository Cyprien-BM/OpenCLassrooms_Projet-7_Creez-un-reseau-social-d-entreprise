import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { getUserFunction } from '../../redux/user/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import { logoutFunction } from '../../redux/user/userReducer';
import logo from '../../Assets/logo/icon-left-font-monochrome-black.png';
import houseLogo from '../../Assets/logo/house.png';
import offline from '../../Assets/logo/offline-button.png';

export default function Navbar(props) {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logState = useSelector((state) => state.userReducer.state);

  useEffect(() => {
    if (logState === 'Session terminée') {
      navigate('/login');
    }
  }, [logState]);

  return (
    <nav>
      <div className='nav__left-block'>
        <img src={logo} alt='Logo groupomania' className='nav-logo' />
        <Link to='/home'>
          <img
            src={houseLogo}
            alt='Bouton retour acceuil'
            className='nav-home-btn'
          />
        </Link>
      </div>
      <div className='nav__right-block'>
        <Link className='user-link' to={`/user/${props.userData.idUSER}`}>
          <div className='user-insert'>
            <img src={props.userData.pictureUrl} alt='Photo de profil' />
            <p>
              {props.userData.nickname}
            </p>
          </div>
        </Link>
        <button
          onClick={() => dispatch(logoutFunction())}
          className='Logout-btn'
        >
          <img src={offline} alt='Boutton déconnexion' title='Déconnexion' />
        </button>
      </div>
    </nav>
  );
}
