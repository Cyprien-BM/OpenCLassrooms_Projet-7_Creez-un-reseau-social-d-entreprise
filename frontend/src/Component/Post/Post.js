import React from 'react';
import './Post.css'

export default function Post(props) {
  return (
    <div className='post'>
      {props.children}
    </div>
  )
}
