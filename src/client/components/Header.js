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

  const navHome = () => {
    navigate("/");
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
    // <nav className="bg-green-500 border-gray-200 h-20">
    <nav className="bg-gradient-to-r from-green-400 to-green-300 h-20 drop-shadow-xl">
      <div className="flex flex-wrap justify-between overflow-visible">
        <div className="overflow-visible static">
          <a className="pl-10 -mt-7 absolute">
            <img src="/img/logo.png" id="logo" alt="" onClick={navProfile} />
          </a>
        </div>

        {
        // JSON.stringify(user) !== JSON.stringify({}) 
        true ? (
          // drop down menu
          <div className="flex justify-center z-10">
            <div>
              <div className="dropdown relative">
                <button
                  className="
          dropdown-toggle
          px-6
          py-2.5
          bg-yellow-500
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
          hover:bg-yellow-600 hover:shadow-lg
          focus:bg-yellow-600 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-yellow-700 active:shadow-lg active:text-white
          transition
          duration-150
          ease-in-out
          flex
          items-center
          whitespace-nowrap
        "
                  type="button"
                  id="dropdownMenuButton1d"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Profile
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="caret-down"
                    className="w-2 ml-2"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                  >
                    <path
                      fill="currentColor"
                      d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                    ></path>
                  </svg>
                </button>
                <ul
                  className="
          dropdown-menu
          overflow-visible
          min-w-max
          absolute
          hidden
          bg-white
          text-base
          z-50
          float-left
          py-2
          list-none
          text-left
          rounded-lg
          shadow-lg
          mt-1
          hidden
          m-0
          bg-clip-padding
        "
                  aria-labelledby="dropdownMenuButton1d"
                >
                  <li>
                    <a
                      className="
              dropdown-item
              text-sm
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
            "
                      href="#"
                    >
                      Action
                    </a>
                  </li>
                  <li>
                    <a
                      className="
              dropdown-item
              text-sm
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
            "
                      href="#"
                    >
                      Another action
                    </a>
                  </li>
                  <li>
                    <a
                      className="
              dropdown-item
              text-sm
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
            "
                      href="#"
                    >
                      Something else here
                    </a>
                  </li>
                  <hr className="h-0 my-2 border border-solid border-t-0 border-gray-700 opacity-25" />
                  <li>
                    <a
                      className="
              dropdown-item
              text-sm
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
            "
                      href="#"
                    >
                      Separated link
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <button
            type="button"
            className="inline-block px-7 py-2.5 mt-5 mr-5 bg-yellow-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-yellow-600 hover:shadow-lg focus:bg-yellow-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-700 active:shadow-lg transition duration-150 ease-in-out"
            onClick={navLogin}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};
