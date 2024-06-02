import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/Signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
