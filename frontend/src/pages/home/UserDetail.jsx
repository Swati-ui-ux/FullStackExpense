import React, { useEffect, useState } from "react"
import axios from "axios"

const UserDetail = () => {
  const [user, setUser] = useState(null)   // ✅ object ke liye null
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

      console.log("User", res.data)

      // ✅ yaha dhyan do
      setUser(res.data.data)

    } catch (err) {
      console.log(err.response?.data)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <div className="p-4">

      {user && (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4 border border-purple-200 text-center">

          <h2 className="text-lg font-semibold text-purple-700">
            👋 Welcome, {user.user?.name}
          </h2>

          <hr className="my-2" />

          <p>Email: {user.user?.email}</p>

          <h3 className="mt-2 font-semibold">
            Total Expense: {user.totalExpense}
          </h3>

        </div>
      ) }

    </div>
  )
}

export default UserDetail