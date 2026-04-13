import React, { useEffect, useState } from "react"
import axios from "axios"

const UserDetail = () => {
  const [user, setUser] = useState(null)
  const [totalExpense, setTotalExpense] = useState(0)

  const token = localStorage.getItem("token")

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/users/me",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      console.log("API Response:", res.data.user)

      // ✅ Correct data mapping
      setUser(res.data.user)
      setTotalExpense(res.data.totalExpense)

    } catch (err) {
      console.log(err.response?.data || err.message)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <div className="flex justify-center items-center mb-4">
      
      {user ? (
        <div className="bg-white shadow-lg rounded-2xl p-6 w-96 border border-purple-200 text-center">

          <h2 className="text-2xl font-bold text-purple-700 mb-2">
            👋 Welcome, {user.name}
          </h2>

          <hr className="my-3" />

          <p className="text-gray-700">
            📧 <span className="font-semibold">Email:</span> {user.email}
          </p>

          <p className="text-gray-700 mt-2">
            💰 <span className="font-semibold">Salary:</span> ₹{user.salary}
          </p>

          <p className="text-gray-700 mt-2">
            🏦 <span className="font-semibold">Remaining Balance:</span> ₹{user.remainingBalance}
          </p>

          <h3 className="mt-4 text-lg font-semibold text-purple-600">
            📊 Total Expense: ₹{totalExpense}
          </h3>

        </div>
      ) : (
        <p className="text-gray-600">Loading...</p>
      )}

    </div>
  )
}

export default UserDetail