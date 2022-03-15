import React from 'react';
import './Login.css';
import LoginComp from '../../Component/FormLogin/FormLogin';
import imgLogoWhite from '../../Assets/logo/icon-left-font-monochrome-white.png';

export default function Login() {
  return (
    <div className='login-page'>
      <img src={imgLogoWhite} alt=''/>
      <LoginComp />
    </div>
  );
}
