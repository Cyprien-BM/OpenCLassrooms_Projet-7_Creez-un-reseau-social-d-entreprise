import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Containers/Login/Login';
import Home from './Containers/Home/Home';
import Register from './Containers/Register/Register';
import User from './Containers/User/User';
import Post from './Containers/PostPage/PostPage';

function App() {
  return (
    <>
      <Routes basename={process.env.PUBLIC_URL}>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Home />} />
        <Route path='/user/:id' element={<User />} />
        <Route path='/post/:postId/:userId' element={<Post />} />
      </Routes>
    </>
  );
}

export default App;
