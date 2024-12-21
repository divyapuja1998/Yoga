import React from 'react'
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignupPage from './Component/SignupPage';
import Login from './Component/Login';
import Dashboard from './Component/Dashboard';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignupPage/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App