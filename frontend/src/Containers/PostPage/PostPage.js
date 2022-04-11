import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../Component/Navbar/Navbar';
import './PostPage.css';
import {
  getUserFunction,
  getUserFunctionById,
} from '../../redux/user/userReducer';
import {
  getOnePostFunction,
  postModificationFunction,
  deletePostFunction,
  deletePostImageFunction,
} from '../../redux/posts/postReducer';
import Button from '../../Component/Button/Button';
import Comment from '../../Component/Comment/Comment';
import CommentModal from '../../Component/Modal/CreateModal/CommentModal';

export default function PostPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ref = useRef();

  const { postId } = useParams();
  const { postCreatorId } = useParams();

  const userData = useSelector((state) => state.userReducer.userData);
  const postState = useSelector((state) => state.postReducer);

  const [user, setUser] = useState(userData ? userData : {});
  const [post, setPost] = useState(postState.post ? postState.post : {});

  //Get user after page loaded
  useEffect(() => {
    dispatch(getUserFunction());
    dispatch(getOnePostFunction(postId));
    if (postCreatorId != userData.idUSER) {
      dispatch(getUserFunctionById(postCreatorId));
    }
    return () => dispatch({ type: 'CLEAN-POST' })
  }, []);

  // When postState.post from reducer change, set post state to postState.post
  useEffect(() => {
    const postCopy = { ...post };
    const newPostState = Object.assign(postCopy, postState.post);
    setPost(newPostState);
  }, [postState.post]);

  useEffect(() => {
    if (postState.status === 'Post modifié !' || postState.status === 'Image supprimé') {
      dispatch(getOnePostFunction(postId));
    } else if (postState.status === 'Post supprimé') {
      navigate('/home');
    }
  }, [postState.status]);

  //Data binding beetween state post and form
  const handleInputs = (event) => {
    if (event.target.classList.contains('post-page-form_input-media')) {
      const previewUrl = URL.createObjectURL(event.target.files[0]);
      ref.current.src = previewUrl;
    } else if (event.target.classList.contains('post-page-form_input')) {
      const newPostState = { ...post, title: event.target.value };
      setPost(newPostState);
    } else if (event.target.classList.contains('post-page-form_textarea')) {
      {
        const newPostState = { ...post, content: event.target.value };
        setPost(newPostState);
      }
    }
  };

  const submitForm = (event) => {
    event.preventDefault();
    dispatch(postModificationFunction(post, event.target[0].files[0], postId));
  };

  const deletePost = () => {
    const answer = window.confirm(
      'Etes vous sûr de vouloir supprimer ce post ?'
    );
    if (answer) {
      dispatch(deletePostFunction(postId));
    }
  };

  const deleteImage= () => {
    const answer = window.confirm(
      'Etes vous sûr de vouloir supprimer l\'image de ce post ?'
    );
    if (answer) {
      dispatch(deletePostImageFunction(postId));
    }
  };

  const [commentModal, setCommentModal] = useState({
    commentId: 0,
    status: false});

  const toggleCommentModal = (id) => {
    const newCommentModalState = {
      commentId: id,
      status: !commentModal.status
    }
    dispatch({ type: 'COMMENT-CLEAN-ERROR' });
    setCommentModal(newCommentModalState);
  };

  return (
    <>
      <header className='post-page-header'>
        <Navbar userData={userData} />
      </header>
      <main className='post-page-body'>
        {postCreatorId == userData.idUSER || userData.isAdmin === 1 ? (
          <form onSubmit={submitForm} className='post-page-form'>
            <div className='post-page-form_media-container'>
              <label htmlFor=''>Média</label>
              <input
                type='file'
                onInput={handleInputs}
                accept='.jpeg, .jpg, .png, .gif'
                className='post-page-form_input-media'
              />
              <img
                src={post.imageUrl}
                alt=''
                className='post-page-img_preview'
                ref={ref}
              />
              {post.imageUrl && <button className='btn-component post-page-btn'
                type='button'
                onClick={deleteImage}>Supprimer l'image</button>}
            </div>
            <div className='post-page-form_data-container'>
              <label htmlFor='post-page-form-title'>
                <h1>Titre du post</h1>
              </label>
              <input
                type='text'
                onInput={handleInputs}
                value={post.title ? post.title : ''}
                id='post-page-form-title'
                className='post-page-form_input'
              />
              <label htmlFor='post-page-form-content'>
                <h2>Contenu du post</h2>
              </label>
              <textarea
                id='post-page-form-content'
                onInput={handleInputs}
                className='post-page-form_textarea'
                name=''
                cols='30'
                rows='10'
                value={post.content ? post.content : ''}
              ></textarea>
            </div>
            <div className='post-page-form_btn-container'>
              <Button
                className='btn-component post-page-btn'
                txt='Modifier le post'
              ></Button>
              <button
                className='btn-component post-page-btn'
                type='button'
                onClick={deletePost}
              >
                Supprimer le post
              </button>
              {postState.status === 'Post modifié !' && <p>Post modifié !</p>}
            </div>
          </form>
        ) : (
          <>
            <h1 className='post-page_title'>{post.title}</h1>
            <div className='post-page_data-container'>
              <p className='post-page_txt'>{post.content}</p>
              <img src={post.imageUrl} alt=''/>
            </div>
          </>
        )}
        <Comment postId={post.idPOSTS} toggleCommentModal={toggleCommentModal}  />
        {commentModal.status && <CommentModal toggleCommentModal={toggleCommentModal} commentId={commentModal.commentId}/>}
      </main>
    </>
  );
}
