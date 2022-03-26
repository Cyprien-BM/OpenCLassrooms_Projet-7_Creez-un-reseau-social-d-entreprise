import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { getAllPosts} from '../../redux/posts/postReducer';
import moment from 'moment';
import localization from 'moment/locale/fr';
import arrowUp from '../../Assets/logo/arrow-up.svg';
import arrowDown from '../../Assets/logo/arrow-down.svg';
import './Post.css';

moment.updateLocale('fr', localization);

export default function Post() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const allPosts = useSelector((state) => state.postReducer);

  useEffect(() => {
    if (allPosts.posts.length === 0) {
      dispatch(getAllPosts());
    }
  }, []);

  //Checking if cookie exist/is valid (by requesting API to gather all post). If not clear error from postReducer state and redirect to login page
  useEffect(() => {
    if (allPosts.error === '403: unauthorized request') {
      dispatch({
        type: 'POST-ERROR',
        payload: '',
    });
      navigate('/login');
    }
  }, [allPosts.error]);

  return allPosts.posts.map((post) => {
    return (
      <div className='post' key={uuidv4()}>
        <div className='post-header'>
          <div className='post-header-content'>
            <p className='post-created-info'>
              Créer par <Link className='user-link' to={`/user/${post.user.idUSER}`}>{post.user.nickname}</Link> le
              {' ' + moment(post.createdAt).format('Do MMMM YYYY, H:mm:ss')}
            </p>
            <h2>{post.title}</h2>
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
        <p>{post.content}</p>
      </div>
    );
  });
}
