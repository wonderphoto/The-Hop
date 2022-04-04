import React from 'react';
import { useNavigate } from 'react-router-dom';


export const Header = ({ user, setUser }) => {
  let navigate = useNavigate();

  const logout = () => {
    fetch('http://localhost:3000/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "username": user.username, "userid": user.userid }),
    }).then(response => response.json())
      .then(user => {
        console.log("user has been successfully logged out and session destroyed")
        // reset user state to empty object
        setUser({});
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div className='w-full py-4 border-color-4 border-green-400 flex justify-between'>
      <p>The Hop!</p>
      <p>Profile</p>
      {JSON.stringify(user) === JSON.stringify({}) ?
        <button onClick={() => navigate('/login')}>Login</button>
        :
        <button onClick={() => logout()}>Logout</button>

      }
    </div>
  )
}
