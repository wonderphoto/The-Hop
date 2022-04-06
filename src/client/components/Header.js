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
    <nav className="bg-green-300 border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <a className="flex items-center">
          <img
            src="../../../../public/img/logo.png"
            className="mr-3 h-6 sm:h-9"
            alt=""
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white" onClick={navProfile}>
            The Hop!
          </span>
        </a>

        {JSON.stringify(user) !== JSON.stringify({}) ? (
          <div>
            <button
              id="dropdownDefault"
              data-dropdown-toggle="dropdownProfile"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              Dropdown button{" "}
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            <div
              id="dropdownProfile"
              className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
            >
              <ul
                className="py-1 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefault"
              >
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Earnings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>
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
