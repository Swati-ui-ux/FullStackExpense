import React from 'react'
import SignUp from './pages/Signup'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'
import { Route, Routes } from 'react-router-dom'

import Dashboard from './pages/home/Dashboard'

const App = () => {
  return (
    <div>
      <ToastContainer autoClose={2000}/>
      <Routes>
       
        <Route path='/signup' element={<SignUp />} />
        
        <Route path='/login' element={<Login />} />
        
   <Route path ="/" element={<Dashboard/>}/>
      </Routes>
    </div>
  )
}

export default App