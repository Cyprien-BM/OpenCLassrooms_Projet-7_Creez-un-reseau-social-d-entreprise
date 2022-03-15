import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Containers/Login/Login';

function App() {
  return (
    <>
      <Routes basename={process.env.PUBLIC_URL}>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
