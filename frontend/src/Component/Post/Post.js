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

  const postsState = useSelector((state) => state.postReducer);

  useEffect(() => {
    if (postsState.posts.length === 0) {
      dispatch(getAllPostsFunction());
    }
  }, []);

  useEffect(() => {
    if (postsState.status === 'Post créé') {
      dispatch(getAllPostsFunction());
    }
  }, [postsState.status]);

  //Checking if cookie exist/is valid (by requesting API to gather all post). If not clear error from postReducer state and redirect to login page
  useEffect(() => {
    if (postsState.error === '403: unauthorized request') {
      dispatch({
        type: 'POST-ERROR',
        payload: '',
      });
      navigate('/login');
    }
  }, [postsState.error]);

  console.log(postsState);

  return postsState.posts.map((post) => {
    return (
    <Link className='post-link' to={`/post/${post.idPOSTS}`} key={uuidv4()}>
      <div className='post'>
        <div className='post-header'>
          <div className='post-header-content'>
            <p className='post-created-info'>
              Créer par{' '}
              <Link className='post-user-link' to={`/user/${post.user.idUSER}`}>
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
        {post.imageUrl && 
        <img src='post.imageUrl' alt='' />}
        </div>
      </div>
      </Link>
    );
  });
}
