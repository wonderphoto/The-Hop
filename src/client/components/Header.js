import React from "react";
import { useNavigate } from "react-router-dom";

export const Header = ({ user, setUser }) => {
  let navigate = useNavigate();

  const navLogin = () => {
    navigate("/login");
  };

  const navProfile = () => {
    navigate("/profile");
  };

  const logout = () => {
    fetch("http://localhost:3000/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: user.username, userid: user.userid }),
    })
      .then((response) => response.json())
      .then((user) => {
        console.log(
          "user has been successfully logged out and session destroyed"
        );
        // reset user state to empty object
        setUser({});
        window.location.reload(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //   return (
  //     <div className='w-full py-4 border-color-4 border-green-400 flex justify-between'>
  //       <p>The Hop!</p>
  //       <p>Profile</p>
  //       {JSON.stringify(user) === JSON.stringify({}) ?
  //         <button onClick={() => navigate('/login')}>Login</button>
  //         :
  //         <button onClick={() => logout()}>Logout</button>

  //       }
  //     </div>
  //   )
  // }

  return (
    <nav className="bg-gray-700 border-gray-200 px-20 sm:px-4 py-2.5 h-20">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <a className="flex items-center">
          <img 
            src="/img/transparentLogo.png"
            id="logo"
            alt=""
          />
          {/* <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white" onClick={navProfile}>
          </span> */}
        </a>

        {JSON.stringify(user) !== JSON.stringify({}) ? (
          null
          // drop down menu
        ) : (
          <button
            type="button"
            className="inline-block px-6 py-2.5 bg-yellow-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-yellow-600 hover:shadow-lg focus:bg-yellow-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-700 active:shadow-lg transition duration-150 ease-in-out"
            onClick={navLogin}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

