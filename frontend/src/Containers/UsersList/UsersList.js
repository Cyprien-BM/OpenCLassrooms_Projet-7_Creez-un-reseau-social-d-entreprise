import React, { useEffect } from 'react';
import Navbar from '../../Component/Navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {
  getAllUsersFunction,
  getUserFunction,
} from '../../redux/user/userReducer';
import './UsersList.css';

export default function UsersList() {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.userReducer.userData);
  const allUsers = useSelector((state) => state.userReducer.usersList);

  //Get user after page loaded (visitor and eventualy user visited if they are different), get comment, post and clean error
  useEffect(() => {
    dispatch(getUserFunction());
    dispatch(getAllUsersFunction());
  }, []);
  //----------------------------------------------//

  return (
    <div className='user-page'>
      <header className='user-header'>
        <Navbar userData={userData} />
      </header>
      <main>
        <ul>
          {allUsers.map((user) => {
            return (
              <li key={uuidv4()}>
                <Link
                  className='users-link'
                  onClick={(event) => event.stopPropagation()}
                  to={`/user/${user.idUSER}`}
                >
                  {user.nickname}
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}
