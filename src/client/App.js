import React, { useState, useEffect } from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from './components/HomePage';

function App() {

  return (
    <HomePage />

    // <BrowserRouter>
    // <Routes>
    //     <Route path="/" element={<HomePage />}></Route>
    // <Route path="/login" element={<LoginPage />}></Route>
    //     <Route path="/signup" element={<SignupPage />}></Route>
    //     <Route path="/profile" element={<ProfilePage />}></Route>
    // </Routes>
    // </BrowserRouter>
  )
}

export default App;
