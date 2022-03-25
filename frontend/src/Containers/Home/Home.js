import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserFunction } from '../../redux/user/userReducer';
import Navbar from '../../Component/Navbar/Navbar';
import Posts from '../../Component/Post/Post';
import './Home.css';

export default function Home() {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.userReducer.userData);

  useEffect(() => {
    dispatch(getUserFunction());
  }, []);

  return (
    <>
      <header className='home-header'>
        <Navbar userData={userData} />
      </header>
      <main className='home-main'>
        <button className='create-post-btn'>
          <h1>Créé un nouveau post</h1>
        </button>
        <section className='home-post-section'>
          <Posts />
        </section>
      </main>
    </>
  );
}
