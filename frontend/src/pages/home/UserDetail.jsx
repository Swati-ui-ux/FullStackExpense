import React, { useEffect, useState } from "react"
import axios from "axios"
const UserDetail = () => {
  const [user, setUser] = useState(null)
  const token = localStorage.getItem("token")

const config = {
  headers: {
    Authorization: `Bearer ${token}`
  }
}
    const fetchUser = async () => {
  try {
    const res = await axios.get(
      "http://localhost:4000/users/me",
      config
    )
    setUser(res.data)
  } catch (err) {
    console.log(err.response?.data)
  }
    }
    useEffect(() => {
  fetchUser()
}, [])
  return (
      <div>
      {user && (
  <div className="bg-white shadow-md rounded-lg p-4 mb-4 border border-purple-200 text-center">
    <h2 className="text-lg font-semibold text-purple-700">
      👋 Welcome, {user.name}
    </h2>
    <p className="text-gray-500">{user.email}</p>
  </div>
)}
      
      </div>
  )
}

export default UserDetail