import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate,Link } from 'react-router-dom'
import { toast } from 'react-toastify'
const Login = () => {
 const navigate =  useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.email || !formData.password) {
    toast.error("Please fill all fields");
    return;
  }

  try {
    const res = await axios.post(
      "http://localhost:4000/users/login",
      formData
    );

    console.log(res.data);

    
    localStorage.setItem("token", res.data.token);
console.log("Token",res.data.token)
    toast.success("Login Successful ✅");

    navigate("/"); 

  } catch (error) {
    console.log(error);
    toast.error("Login failed ❌");
  }
};


  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      
      <form 
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-80"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <input
          type="email"
                  name="email"
                  required
          placeholder="Enter email"
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
                  name="password"
                  required
          placeholder="Enter password"
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
                  className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
                  onClick={handleSubmit}
        >
          Login
        </button>
      </form>
       <span>Forgot password <Link to='/forgot-password'>click</Link></span>
      
    </div>
  )
}

export default Login