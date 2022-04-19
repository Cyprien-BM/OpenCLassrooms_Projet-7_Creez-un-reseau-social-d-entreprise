import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Containers/Login/Login';
import Home from './Containers/Home/Home';
import Register from './Containers/Register/Register';
import User from './Containers/User/User';
import Users from './Containers/UsersList/UsersList';
import Post from './Containers/PostPage/PostPage';
import NotFound from './Containers/NotFound/NotFound';

function App() {
  return (
    <>
      <Routes basename={process.env.PUBLIC_URL}>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Home />} />
        <Route path='/user/:id' element={<User />} />
        <Route path='/users' element={<Users />} />
        <Route path='/post/:postId/:postCreatorId' element={<Post />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
