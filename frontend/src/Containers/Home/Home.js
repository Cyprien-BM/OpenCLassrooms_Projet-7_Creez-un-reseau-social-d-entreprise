import React from 'react'
import {useSelector} from 'react-redux';

export default function Home() {

  const donneUser = useSelector((state) => state.loginReducer);

  return (
    <div>
      <h1>hello</h1>
      <p>{donneUser.state.token}</p>
    </div>
  )
}
