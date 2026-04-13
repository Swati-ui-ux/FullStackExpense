import React from 'react'
import SignUp from './pages/Signup'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'
import { Route, Routes } from 'react-router-dom'

import Dashboard from './pages/home/Dashboard'
import Forgot from './pages/home/Forgot'

const App = () => {
  return (
    <div>
      <ToastContainer autoClose={2000}/>
      <Routes>
       
        <Route path='/signup' element={<SignUp />} />
        
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<Forgot/>}/>
        
   <Route path ="/" element={<Dashboard/>}/>
      </Routes>
    </div>
  )
}

export default App