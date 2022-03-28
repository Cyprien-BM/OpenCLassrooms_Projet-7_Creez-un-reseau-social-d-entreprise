import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Navbar from '../../Component/Navbar/Navbar';
import './PostPage.css';
import { getUserFunction } from '../../redux/user/userReducer';
import { getOnePostFucntion } from '../../redux/posts/postReducer';

export default function PostPage() {
  const dispatch = useDispatch();

  const { postId } = useParams();

  const userData = useSelector((state) => state.userReducer.userData);

  const [user, setUser] = useState(userData ? userData : {});

  //Get user after page loaded
  useEffect(() => {
    dispatch(getUserFunction());
    dispatch(getOnePostFucntion(postId))
    // if (id != userData.idUSER) {
    //   dispatch(getUserFunctionById(id));
    // }
  }, []);

  console.log(postId);

  return (
    <>
      <header className='post-page-header'>
        <Navbar userData={userData} />
      </header>
      <main className='post-page-body'>Helo</main>
    </>
  );
}
