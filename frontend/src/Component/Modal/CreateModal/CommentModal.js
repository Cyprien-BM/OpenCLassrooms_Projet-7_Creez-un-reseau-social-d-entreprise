import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  modifyAComment,
  deleteCommentImageFunction,
} from '../../../redux/comments/commentsReducer';
import Button from '../../Button/Button';

export default function CommentModal(props) {
  const dispatch = useDispatch();
  const ref = useRef();

  const commentState = useSelector((state) => state.commentsReducer);

  // Find the actual comment
  let actualComment = commentState.comments.find(
    (comment) => comment.commentId === props.commentId
  );

  const [comment, setComment] = useState(actualComment);
  //---------------------------------------------//

  //Data binding beetween comment state and form
  const handleInputs = (event) => {
    if (event.target.classList.contains('modal-post-and-comment_img-input')) {
      const previewUrl = URL.createObjectURL(event.target.files[0]);
      ref.current.src = previewUrl;
    } else if (
      event.target.classList.contains('modal-post-and-comment_content-textArea')
    ) {
      const newCommentState = { ...comment, content: event.target.value };
      setComment(newCommentState);
    }
  };
  //---------------------------------------------//

  // Clean postState status and close modal after post creation
  useEffect(() => {
    if (
      commentState.status === 'Commentaire modifié !' ||
      commentState.status === 'Image supprimé'
    ) {
      props.toggleCommentModal();
    }
  }, [commentState.status, props]);
  //---------------------------------------------//

  //Modify comment
  const onSubmit = (event) => {
    event.preventDefault();
    if (event.target[2].files !== undefined) {
      dispatch(modifyAComment(comment, event.target[2].files[0]));
    } else {
      dispatch(modifyAComment(comment, null));
    }
  };

  const deleteImage = () => {
    const answer = window.confirm(
      "Etes vous sûr de vouloir supprimer l'image de ce commentaire ?"
    );
    if (answer) {
      dispatch(deleteCommentImageFunction(comment.commentId));
    }
  };
  //---------------------------------------------//

  return (
    <>
      <div className='overlay create-post-and-comment'>
        <div className='modal create-post-and-comment'>
          <div className='modal-content create-post-and-comment'>
            <form
              onSubmit={onSubmit}
              className='modal-create-post-and-comment-form'
            >
              <button
                type='button'
                className='btn-component form-create-post-and-comment_close-button'
                onClick={() => {
                  dispatch({ type: 'CLEAN-ERROR' });
                  props.toggleCommentModal();
                }}
              >
                Fermer
              </button>
              <label htmlFor='modal-post-and-comment-content'>
                Commentaire <span className='post-nb-char'>(max 1500)</span>
              </label>
              <textarea
                name='comment content'
                id='modal-post-and-comment-content'
                cols='30'
                rows='10'
                className='modal-post-and-comment_content-textArea'
                onInput={handleInputs}
                value={comment.content}
              ></textarea>
              <div className='modal-post-and-comment_img-container'>
                <div className='modal-post-and-comment_img-input-container'>
                  <label htmlFor='modal-post-and-comment_img'>
                    Ajouter une photo ?
                  </label>
                  <input
                    type='file'
                    id='modal-post-and-comment_img'
                    className='modal-post-and-comment_img-input'
                    accept='.jpeg, .jpg, .png, .gif'
                    name='image'
                    onInput={handleInputs}
                  />
                </div>
                <img
                  src={comment.imageUrl}
                  alt=''
                  className='modal-post-and-comment_img-preview'
                  ref={ref}
                />
              </div>
              <div className='modal-post-and-comment_error-container'>
                <p className='form-error'>{commentState.error}</p>
              </div>
              {comment.imageUrl && (
                <button
                  className='btn-component form-comment-button'
                  type='button'
                  onClick={deleteImage}
                >
                  Supprimer l'image
                </button>
              )}
              <Button
                className='btn-component form-comment-button'
                txt='Modifier le commentaire'
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
