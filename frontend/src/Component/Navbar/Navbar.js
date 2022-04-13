import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { getUserFunction } from '../../redux/user/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import { logoutFunction } from '../../redux/user/userReducer';
import logoFull from '../../Assets/logo/icon-left-font-monochrome-black.png';
import logoOnly from '../../Assets/logo/icon-black.png';
import houseLogo from '../../Assets/logo/house.png';
import offline from '../../Assets/logo/offline-button.png';

export default function Navbar(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userState = useSelector((state) => state.userReducer);

  // Window width tracking for responsive
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowWidth);
    return () => {
      window.removeEventListener('resize', handleWindowWidth);
    };
  }, [setWindowWidth]);
  //--------------------------------------------//

  // Redirect to login when user disconnect
  useEffect(() => {
    if (userState.status === 'Session terminée') {
      navigate('/login');
    }
  }, [userState.status]);
  //--------------------------------------------//

  return (
    <nav>
      <div className='nav_left-block'>
        <img
          src={windowWidth > 767 ? logoFull : logoOnly}
          alt='Logo groupomania'
          className='nav-logo'
        />
        <Link to='/home'>
          <img
            src={houseLogo}
            alt='Bouton retour acceuil'
            className='nav-home-btn'
            title='Acceuil'
          />
        </Link>
      </div>
      <div className='nav_right-block'>
        <Link className='user-link' to={`/user/${props.userData.idUSER}`}>
          <div className='user-insert'>
            <img src={props.userData.pictureUrl} alt='Photo de profil' />
            {windowWidth > 767 && <p>{props.userData.nickname}</p>}
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
