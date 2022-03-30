import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../Button/Button';
import './CreateAPostModal.css';
import { createAPostFunction } from '../../../redux/posts/postReducer';

export default function CreateAPostModal(props) {
  const dispatch = useDispatch();
  const ref = useRef();

  const [post, setPost] = useState({
    title: '',
    content: '',
  });

  const postState = useSelector((state) => state.postReducer);

  // Clean postState status after post creation
  useEffect(() => {
    if (postState.status === 'Post créé') {
      dispatch({ type: 'CLEAN-STATUS' });
      props.toggleModal();
    }
  }, [postState.status]);

  //Data binding beetween state post and form
  const handleInputs = (event) => {
    if (event.target.classList.contains('modal-post_img-input')) {
      const previewUrl = URL.createObjectURL(event.target.files[0]);
      ref.current.src = previewUrl;
    } else if (event.target.classList.contains('modal-post_title-input')) {
      const newPostState = { ...post, title: event.target.value };
      setPost(newPostState);
    } else if (event.target.classList.contains('modal-post_content-textArea')) {
      const newPostState = { ...post, content: event.target.value };
      setPost(newPostState);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (event.target.files != undefined) {
      dispatch(createAPostFunction(post, event.target[0].files[0]));
    } else {
      dispatch(createAPostFunction(post, null));
    }
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
                onClick={() => {
                  dispatch({ type: 'CLEAN-ERROR' });
                  props.toggleModal();
                }}
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
                Contenu du post <span className='post-nb-char'>(max 1500)</span>
              </label>
              <textarea
                name='post content'
                id='modal-post-content'
                cols='30'
                rows='10'
                placeholder='Contenu du post'
                className='modal-post_content-textArea'
                onInput={handleInputs}
                value={post.content}
              ></textarea>
              <div className='modal-post_img-container'>
                <div className='modal-post_img-input-container'>
                  <label htmlFor='modal-post_img'>Ajouter une photo ?</label>
                  <input
                    onInput={handleInputs}
                    type='file'
                    id='modal-post_img'
                    className='modal-post_img-input'
                    accept='.jpeg, .jpg, .png, .gif'
                    name='image'
                  />
                </div>
                <img
                  src={''}
                  alt=''
                  className='modal-post_img-preview'
                  ref={ref}
                />
              </div>
              <div className='modal-post_error-container'>
                <p className='form-error'>{postState.error}</p>
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
