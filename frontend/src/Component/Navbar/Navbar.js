import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { getUserFunction } from '../../redux/user/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../Assets/logo/icon-left-font-monochrome-black.png';
import houseLogo from '../../Assets/logo/house.png';
import offline from '../../Assets/logo/offline-button.png';

export default function Navbar() {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.userReducer.userData);

  useEffect(() => {
    dispatch(getUserFunction());
  }, []);

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
        <div className='user-insert'>
          <img src={userData.pictureUrl} />
          <p>{userData.nickname}</p>
        </div>
        <button className='Logout-btn'>
          <img src={offline} alt='Boutton déconnexion' title='Déconnexion' />
        </button>
      </div>
    </nav>
  );
}
