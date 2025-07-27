import React from 'react'
import {BrowserRouter, Routes, Route, } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Home from './Components/Home';

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <NavBar/>
        <Routes>
          <Route path='/' element= {<Home/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
