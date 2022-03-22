import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../../Component/Navbar/Navbar';
import Post from '../../Component/Post/Post';
import { v4 as uuidv4 } from 'uuid';
import { getAllPosts } from '../../redux/posts/postReducer';
import './Home.css';
import moment from 'moment';
import localization from 'moment/locale/fr';

moment.updateLocale('fr', localization);

export default function Home() {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.postReducer.posts);

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(getAllPosts());
    }
  }, []);

  console.log(posts);

  return (
    <>
      <header className='home-header'>
        <Navbar />
      </header>
      <main className='home-main'>
        <section className='home-post-section'>
          {posts.map((post) => {
            return (
              <Post key={uuidv4()}>
                <div className='post-header'>
                  <div className='post-header-content'>
                    <p>Créer par {post.user.nickname} le {moment(post.createdAt).format('Do MMMM YYYY, H:mm:ss')}</p>
                    <h2>{post.title}</h2>
                    <p className='created-at'>
                      
                    </p>
                  </div>
                  <div className='post-likes'>
                    <p>{post.likes}</p>
                  </div>
                </div>
                <p>{post.content}</p>
              </Post>
            );
          })}
        </section>
      </main>
    </>
  );
}
