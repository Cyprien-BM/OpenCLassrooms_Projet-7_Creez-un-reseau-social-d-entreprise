import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { getAllPostsFunction } from '../../redux/posts/postReducer';
import moment from 'moment';
import localization from 'moment/locale/fr';
import arrowUp from '../../Assets/logo/arrow-up.svg';
import arrowDown from '../../Assets/logo/arrow-down.svg';
import './Post.css';

moment.updateLocale('fr', localization);

export default function Post() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const postState = useSelector((state) => state.postReducer);

  useEffect(() => {
    if (postState.posts.length === 0) {
      dispatch(getAllPostsFunction());
    }
  }, []);

  useEffect(() => {
    if (
      (postState.status === 'Post créé' ||
      postState.status === 'Post modifié !' ||
      postState.status === 'Post supprimé')
    ) {
      dispatch(getAllPostsFunction());
      dispatch({type: 'CLEAN-STATUS'})
    }
  }, [postState.status]);

  //Checking if cookie exist/is valid (by requesting API to gather all post). If not clear error from postReducer state and redirect to login page
  useEffect(() => {
    if (postState.error === '403: unauthorized request') {
      dispatch({
        type: 'POST-ERROR',
        payload: '',
      });
      navigate('/login');
    }
  }, [postState.error]);

  return postState.posts.map((post) => {
    return (
      <div
        className='post'
        key={uuidv4()}
        onClick={(event) =>
          navigate(`/post/${post.idPOSTS}/${post.user.idUSER}`)
        }
      >
        <div className='post-header'>
          <div className='post-header-content'>
            <p className='post-created-info'>
              Créer par{' '}
              <Link
                className='post-user-link'
                onClick={(event) => event.stopPropagation()}
                to={`/user/${post.user.idUSER}`}
              >
                {post.user.nickname}
              </Link>{' '}
              le
              {' ' + moment(post.createdAt).format('Do MMMM YYYY, H:mm:ss')}
            </p>
          </div>

          <div className='post-likes'>
            <img src={arrowUp} alt='Liker le post' className='arrow like' />
            <p>{post.likes}</p>
            <img
              src={arrowDown}
              alt='Disliker le post'
              className='arrow dislike'
            />
          </div>
        </div>
        <div className='post-body'>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          {post.imageUrl && (
            <img src={post.imageUrl} alt='' className='post-img' />
          )}
        </div>
      </div>
    );
  });
}
