import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Registration from './components/Registration'


const App = () => {
  return (
    <>
        <div>
          <Routes>
            <Route exact path='/' element={<Home/>}></Route>
            <Route path='/log' element={<Login/>}></Route>
            <Route path='/reg' element={<Registration/>}></Route>
          </Routes>
        </div>
    </>
  )
}

export default App