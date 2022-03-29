import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../Button/Button';
import './CreateAPostModal.css';
import { createAPostFunction } from '../../../redux/posts/postReducer';

export default function CreateAPostModal(props) {
  const dispatch = useDispatch();

  const [post, setPost] = useState({
    title: '',
    content: '',
  });

  //Data binding beetween state post and form
  const handleInputs = (event) => {
    if (event.target.classList.contains('modal-post_title-input')) {
      const newPostState = { ...post, title: event.target.value };
      setPost(newPostState);
    } else if (event.target.classList.contains('modal-post_title-textArea')) {
      {
        const newPostState = { ...post, content: event.target.value };
        setPost(newPostState);
      }
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(createAPostFunction(post));
  };

  return (
    <>
      <div className='overlay create-post'>
        <div className='modal create-post'>
          <div className='modal-content create-post'>
            <form onSubmit={onSubmit} className='modal-create-a-post-form'>
              <button
                type='button'
                className='btn-component form-create-post_close-button'
                onClick={() => props.toggleModal()}
              >
                Fermer
              </button>
              <label htmlFor='modal-post-title'>
                Titre <span className='post-nb-char'>(max 100)</span>
              </label>
              <input
                type='text'
                onInput={handleInputs}
                value={post.title}
                id='modal-post-title'
                placeholder='Titre du post'
                className='modal-post_title-input'
              />
              <label htmlFor='modal-post-content'>
                Contenu du post <span className='post-nb-char'>(max 500)</span>
              </label>
              <textarea
                name='post content'
                id='modal-post-content'
                cols='30'
                rows='10'
                placeholder='Contenu du post'
                className='modal-post_title-textArea'
                onInput={handleInputs}
                value={post.content}
              ></textarea>
              <label htmlFor='user-picture' className='label-user-input-file'>
                Envi d'une nouvelle photo de profil ?
              </label>
              <input
                // onInput={handleInputs}
                type='file'
                id='user-picture'
                className='form-user_picture'
                accept='.jpeg, .jpg, .png, .gif'
                name='image'
              />
              <div className='modal-password-error-container'>
                <p className='form-error'></p>
              </div>
              <div className='modal-password-succes-container'>
                <p className='form-succes'></p>
              </div>
              <Button
                className='btn-component form-user-button'
                txt='Créer le post'
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
