import React, { useState } from 'react';
import '../Modal.css';

export default function Modal() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <button type='button' onClick={toggleModal} className='toggle-modal'>
        ?
      </button>
      {modal && (
        <div className='overlay'>
          <div className='modal'>
            <div className='modal-content'>
              <p>
                Le mot de passe doit contenir entre 8 et 64 caratères avec au
                moins 1 minuscule, 1 majuscule, 2 chiffres et 1 caractères
                spécial.
              </p>
              <button onClick={toggleModal} className='close-modal'>
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
