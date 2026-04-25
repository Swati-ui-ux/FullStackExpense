import { createContext, useEffect, useState } from "react"
import axios from "axios"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isPremium, setIsPremium] = useState(false)
  const [user, setUser] = useState(null)
  const [totalExpense, setTotalExpense] = useState(0)

  const token = localStorage.getItem("token")

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  // fetch user details
  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:4000/users/me", config)

      setUser(res.data.user)
      setTotalExpense(res.data.totalExpense)
      setIsPremium(res.data.user.isPremium)

    } catch (err) {
      console.log(err.response?.data)
    }
  }

  // update salary
  const updateSalary = async (salary) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/users/salary",
        { salary: Number(salary) },
        config
      )

      // 🔥 direct update
      setUser(prev => ({
        ...prev,
        salary: res.data.salary,
        remainingBalance: res.data.remainingBalance
      }))

    } catch (err) {
      console.log(err.response?.data)
    }
  }

  // add expense
  const addExpense = async (amount, description) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/expense",
        { amount, description },
        config
      )

      // 🔥 direct update (NO REFRESH)
      setUser(prev => ({
        ...prev,
        remainingBalance: res.data.remainingBalance
      }))

      setTotalExpense(prev => prev + Number(amount))

    } catch (err) {
      console.log(err.response?.data)
    }
  }

  // delete expense
  const deleteExpense = async (id, amount) => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/expense/${id}`,
        config
      )

      // 🔥 direct update
      setUser(prev => ({
        ...prev,
        remainingBalance: res.data.remainingBalance
      }))

      setTotalExpense(prev => prev - Number(amount))

    } catch (err) {
      console.log(err.response?.data)
    }
  }

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true)
      fetchUser()
    }
  }, [])

  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      isPremium,
      user,
      totalExpense,
          fetchUser,
      setIsPremium,
      updateSalary,
      addExpense,
      deleteExpense
    }}>
      {children}
    </AuthContext.Provider>
  )
}