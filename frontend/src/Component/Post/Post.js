import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {
  getAllPostsFunction,
  likeFunction,
} from '../../redux/posts/postReducer';
import { getUserLike } from '../../redux/user/userReducer';
import moment from 'moment';
import localization from 'moment/locale/fr';
import arrowUp from '../../Assets/logo/arrow-up.svg';
import arrowDown from '../../Assets/logo/arrow-down.svg';
import './Post.css';
import Comment from '../Comment/Comment';

moment.updateLocale('fr', localization);

export default function Post(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const postState = useSelector((state) => state.postReducer);
  const userState = useSelector((state) => state.userReducer);

  // Checking post status, if any modification : clean it after recovering all post and likes
  useEffect(() => {
    if (
      postState.status === 'Post créé' ||
      postState.status === 'Post modifié' ||
      postState.status === 'Post supprimé' ||
      postState.status === 'Like éffectué' ||
      postState.status === 'Image supprimé'
    ) {
      dispatch(getAllPostsFunction());
      dispatch({ type: 'CLEAN-STATUS' });
      dispatch(getUserLike());
    }
  }, [postState.status, dispatch]);

  //Checking if cookie exist/is valid with postState => If not : redirect to login page
  useEffect(() => {
    if (postState.error === '403: unauthorized request') {
      dispatch({
        type: 'POST-ERROR',
        payload: '',
      });
      navigate('/login');
    }
  }, [postState.error, dispatch, navigate]);
  //-----------------------------------------------------------------//

  //Get user likes for btn styles
  const like = (likeValue, id) => dispatch(likeFunction(likeValue, id));

  const isUserLikePost = (postId) => {
    const likeFound = userState.userLike.find((post) => post.postId === postId);
    if (likeFound) {
      return likeFound.likeValue;
    }
  };
  //-----------------------------------------------------------------//

  return postState.posts.map((post) => {
    let sumLike = 0;
    post.Likes.map((like) => {
      sumLike += like.likeValue;
    });
    return (
      <article key={uuidv4()} className='post'>
        <div>
          <div
            className='post-content'
            onClick={(event) =>
              navigate(`/post/${post.idPOSTS}/${post.user.idUSER}`)
            }
          >
            <div className='post-header'>
              <div className='post-header-content'>
                <img
                  src={post.user.pictureUrl}
                  alt='Photo de profil du créateur du post'
                />
                <p className='post-created-info'>
                  Créer par{' '}
                  <strong>
                    <Link
                      className='post-user-link'
                      onClick={(event) => event.stopPropagation()}
                      to={`/user/${post.user.idUSER}`}
                    >
                      {post.user.nickname}
                    </Link>
                  </strong>{' '}
                  le
                  {' ' + moment(post.createdAt).format('Do MMMM YYYY, H:mm:ss')}
                </p>
              </div>
              <div className='post-likes'>
                <img
                  src={arrowUp}
                  alt='Liker le post'
                  className={
                    'arrow ' +
                    (isUserLikePost(post.idPOSTS) === 1 ? 'green' : '')
                  }
                  onClick={(event) => {
                    event.stopPropagation();
                    like(1, post.idPOSTS);
                  }}
                />
                <p
                  className={
                    'post-like-number ' +
                    (sumLike > 0 ? 'green' : sumLike < 0 ? 'red' : '')
                  }
                >
                  {sumLike}
                </p>
                <img
                  src={arrowDown}
                  alt='Disliker le post'
                  className={
                    'arrow ' + (isUserLikePost(post.idPOSTS) === -1 ? 'red' : '')
                  }
                  onClick={(event) => {
                    event.stopPropagation();
                    like(-1, post.idPOSTS);
                  }}
                />
              </div>
            </div>
            <div className='post-body'>
              <h2>{post.title}</h2>
              <p className='post-txt'>{post.content}</p>
              {post.imageUrl && (
                <img src={post.imageUrl} alt='Image du post' className='post-img' />
              )}
            </div>
          </div>
          <Comment
            postId={post.idPOSTS}
            toggleCommentModal={props.toggleCommentModal}
          />
        </div>
      </article>
    );
  });
}
