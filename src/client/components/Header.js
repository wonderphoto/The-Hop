import React from 'react';
import { useNavigate } from 'react-router-dom';


export const Header = () => {
  let navigate = useNavigate();

  return (
    <div className='w-full py-4 border-color-4 border-green-400 flex justify-between'>
      <p>The Hop!</p>
      <p>Profile</p>
      <button onClick={() => navigate('/login')}>Login</button>
    </div>
  )
}
