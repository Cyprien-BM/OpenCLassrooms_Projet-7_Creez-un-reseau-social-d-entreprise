import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../Modal.css';
import Button from '../../Button/Button';
import { changePasswordFunction } from '../../../redux/user/userReducer';

export default function Modal() {
  const dispatch = useDispatch();

  const passwordState = useSelector((state) => state.userReducer);

  const [error, setError] = useState();

  const [succes, setSucces] = useState();

  const [password, setPassword] = useState({password: ''});

  useEffect(() => {
    if (passwordState.state === 'Mots de passe modifié !') {
      setError();
      setSucces(passwordState.state)
    } else if (passwordState.error) {
      setError(passwordState.error);
    }
  }, [passwordState]);

  const handleInputs = (event) => {
    if (event.target.classList.contains('modal-password_input')) {
      const newPassword = {...password, password: event.target.value}
      setPassword(newPassword);
    }
  };

  const submitForm = (event) => {
    event.preventDefault();
    dispatch(changePasswordFunction(password));
  };

  return (
    <>
      <div className='overlay password'>
        <div className='modal password'>
          <div className='modal-content password'>
            
            <form className='modal-password-form' onSubmit={submitForm}>
              <label htmlFor='modal-password'>Nouveau mot de passe</label>
              <input
                type='password'
                onInput={handleInputs}
                id='modal-password'
                autoComplete='new-password'
                placeholder='Entrez votre mot de passe'
                className='modal-password_input'
              />
              <div className='modal-password-error-container'>
                <p className='form-error'>{error}</p>
              </div>
              <Button
                className='btn-component form-user-button'
                txt='Modifier le mot de passe'
              />
              <div className='modal-password-succes-container'>
            <p className='form-succes'>{succes}</p>
            </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
