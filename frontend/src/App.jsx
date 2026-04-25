import React, { useContext, useEffect,useState } from 'react'
import SignUp from './pages/Signup'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'
import { Route, Routes } from 'react-router-dom'

import Dashboard from './pages/home/Dashboard'
import Forgot from './pages/home/Forgot'
import ResetPassword from './pages/home/ResetPassword'
import ExpenseReport from './pages/home/ExpenseReport'
import { AuthContext } from './context/AuthContext'
import PaymentSuccess from './pages/home/PaymentSuccess'
import CheckPremium from './pages/home/CheckPremium'
const App = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     setIsLoggedIn(true);
  //   }
  // },[])
  const {isLoggedIn} = useContext(AuthContext)
  
  
  return (
    <div>
      <ToastContainer autoClose={2000}/>
      <Routes>
       
   <Route path ="/" element={isLoggedIn ? <Dashboard isLoggedIn={isLoggedIn} /> : <Login />} />
        <Route path='/signup' element={<SignUp />} />
        
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<Forgot/>}/>
        <Route path='/reset-password/:token' element={<ResetPassword />} />
        <Route path='/expense-report' element={<ExpenseReport />} />
          <Route path='/check-premium' element={<CheckPremium/>} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
      </Routes>
    </div>
  )
}

export default App


