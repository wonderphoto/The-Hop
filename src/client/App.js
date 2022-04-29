import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { LoginPage } from "./components/LoginPage";
import { SignupPage } from "./components/SignupPage";
import { ProfilePage } from "./components/ProfilePage";

function App() {
  const [user, setUser] = useState({});
  const [loginStatus, setLoginStatus] = useState(false);

  const login = async () => {
    const username = document.getElementById("usernameLoginForm").value;
    const password = document.getElementById("passwordLoginForm").value;

    return await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include",
      body: JSON.stringify({ "username": username, "password": password }),
    })
      .then(response => response.json())
      .then(user => {
        if (user.username === username) {
          setLoginStatus(true);
          window.location.href = '/';
        }
        else {
          alert('Wrong password!');
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  const signup = async () => {
    let username = document.getElementById("usernameCreateUserForm").value;
    let password = document.getElementById("passwordCreateUserForm").value;
    let email = document.getElementById("emailCreateUserForm").value;

    return await fetch('http://localhost:3000/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include",
      body: JSON.stringify({ "username": username, "password": password, "email": email }),
    }).then((response) => {
      if (response.status === 200) {
        setLoginStatus(true);
        window.location.href = '/';
      } else {
        alert("Error during sign up process")
      }
    })
      .catch(err => {
        console.log(err);
      })
  }

  // passed down to header logout button's onClick thru props
  const logout = async () => {
    return await fetch("http://localhost:3000/auth/logout", {
      method: "DELETE",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      credentials: "include",
    })
      .then((res) => {
        setUser({});
        setLoginStatus(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // fetches user data from backend session and populates state
  const sessionCheck = async () => {
    return await fetch("http://localhost:3000/auth", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.isLoggedIn) {
          setUser(data.user);
        }
      });
  };

  // fetches session everytime page renders
  useEffect(() => {
    console.log("session check");
    sessionCheck();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<HomePage user={user} logout={logout} />}
        ></Route>
        <Route path="/login" element={<LoginPage login={login} />}></Route>
        <Route path="/signup" element={<SignupPage signup={signup} />}></Route>
        <Route
          path="/profile"
          element={<ProfilePage user={user} logout={logout} />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
