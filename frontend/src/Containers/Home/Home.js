import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserFunction, getUserLike } from '../../redux/user/userReducer';
import { getAllPostsFunction } from '../../redux/posts/postReducer';
import { getAllComments } from '../../redux/comments/commentsReducer';
import Navbar from '../../Component/Navbar/Navbar';
import Posts from '../../Component/Post/Post';
import CreateAPost from '../../Component/Modal/CreateModal/CreateAPostModal';
import CommentModal from '../../Component/Modal/CreateModal/CommentModal';
import './Home.css';

export default function Home() {
  const dispatch = useDispatch();

  const userState = useSelector((state) => state.userReducer);
  const postState = useSelector((state) => state.postReducer);
  const commentState = useSelector((state) => state.commentsReducer);

  const [postModal, setPostModal] = useState(false);

  const togglePostModal = () => {
    setPostModal(!postModal);
  };

  // Modal for comment editing
  const [commentModal, setCommentModal] = useState({
    commentId: 0,
    status: false,
  });

  const toggleCommentModal = (id) => {
    const newCommentModalState = {
      commentId: id,
      status: !commentModal.status,
    };
    dispatch({ type: 'COMMENT-CLEAN-ERROR' });
    setCommentModal(newCommentModalState);
  };
  //----------------------------------------------//

  // Get all states after page load
  useEffect(() => {
    if (postState.posts.length === 0) {
      dispatch(getAllPostsFunction());
    }
    if (commentState.comments.length === 0) {
      dispatch(getAllComments());
    }
    if (userState.userLike.length === 0) {
      dispatch(getUserLike());
    }
    dispatch(getUserFunction());
    dispatch({ type: 'COMMENT-CLEAN-ERROR' });
  }, []);
  //----------------------------------------------//

  useEffect(() => {
    if (userState.status === 'Utilisateur Supprimé') {
      dispatch({ type: 'RESET-STATE', payload: '' });
      dispatch(getAllPostsFunction());
      dispatch(getAllComments());
    }
  }, [userState.status]);
  //----------------------------------------------//

  return (
    <>
      <header className='home-header'>
        <Navbar userData={userState.userData} />
      </header>
      <main className='home-main'>
        <button
          onClick={togglePostModal}
          className='btn-component create-post-btn'
        >
          <h1>Envie de partager quelque chose ?</h1>
        </button>
        {postModal && <CreateAPost togglePostModal={togglePostModal} />}
        {commentModal.status && (
          <CommentModal
            toggleCommentModal={toggleCommentModal}
            commentId={commentModal.commentId}
          />
        )}
        <section className='home-post-section'>
          <Posts toggleCommentModal={toggleCommentModal} />
        </section>
      </main>
    </>
  );
}
