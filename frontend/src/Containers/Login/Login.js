import React from 'react';
import LoginComp from '../../Component/FormLoginRegister/FormLogin';
import imgLogoWhite from '../../Assets/logo/icon-left-font-monochrome-white.png';

export default function Login() {

  return (
    <div className='login-page'>
      <img src={imgLogoWhite} alt='Logo groupomania'/>
      <LoginComp />
    </div>
  );
}
