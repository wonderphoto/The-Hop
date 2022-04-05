import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from './components/HomePage';
import { LoginPage } from './components/LoginPage';
import { SignupPage } from './components/SignupPage';
import { ProfilePage } from './components/ProfilePage';


function App() {
  const [user, setUser] = useState({});

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage user={user} setUser={setUser} />}></Route>
        <Route path="/login" element={<LoginPage setUser={setUser} />}></Route>
        <Route path="/signup" element={<SignupPage setUser={setUser} />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;