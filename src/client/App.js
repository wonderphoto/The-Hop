import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { LoginPage } from "./components/LoginPage";
import { SignupPage } from "./components/SignupPage";
import { ProfilePage } from "./components/ProfilePage";

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const sessionCheck = async () => {
      const response = await fetch("http://localhost:3000/auth", {
        credentials: "include",
      }).then((res) => res.json())
        .then((response) => {
          console.log('returned response from auth is:', response)
          if (response.isLoggedIn) {
            setUser(response.user);
          }
        })
    };
    sessionCheck();
  }, [document.location.href]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<HomePage user={user} />}
        ></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/profile" element={<ProfilePage user={user} />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;