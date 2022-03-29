import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserFunction } from '../../redux/user/userReducer';
import Navbar from '../../Component/Navbar/Navbar';
import Posts from '../../Component/Post/Post';
import CreateAPost from '../../Component/Modal/CreateAPostModal/CreateAPostModal';
import './Home.css';

export default function Home() {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.userReducer.userData);

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    dispatch(getUserFunction());
  }, []);

  return (
    <>
      <header className='home-header'>
        <Navbar userData={userData} />
      </header>
      <main className='home-main'>
        <button onClick={toggleModal} className='btn-component create-post-btn'>
          <h1>Envie de partager quelque chose ?</h1>
        </button>
        {modal && <CreateAPost toggleModal={toggleModal}/>}
        <section className='home-post-section'>
          <Posts />
        </section>
      </main>
    </>
  );
}
