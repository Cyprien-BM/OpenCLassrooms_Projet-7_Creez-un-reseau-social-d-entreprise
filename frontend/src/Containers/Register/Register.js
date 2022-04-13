import React from 'react';
import imgLogoWhite from '../../Assets/logo/icon-left-font-monochrome-white.png';
import RegisterComp from '../../Component/FormLoginRegister/FormRegister';

export default function Register() {
  return (
    <div className='register-page'>
      <img src={imgLogoWhite} alt='Logo groupomania' />
      <RegisterComp />
    </div>
  );
}
