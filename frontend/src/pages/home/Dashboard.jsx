import React, { useEffect, useState } from "react"
import axios from "axios"
import ExpenseList from "./ExpenseList"
import { useNavigate } from "react-router-dom"
import UserDetail from "./UserDetail"

const Dashboard = () => {
  const [salary, setSalary] = useState(0)
  const [balance, setBalance] = useState(0)
  const [inputSalary, setInputSalary] = useState("")
  const [amount, setAmount] = useState("")
  const [desc, setDesc] = useState("")
  const [expenses, setExpenses] = useState([])
  const [showAllUser,setShowAllUser] = useState([])
const navigate = useNavigate()
  const token = localStorage.getItem("token")

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
   const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:4000/expense", config)
      console.log(res.data)
      setExpenses(res.data?.expenses || [])
      setBalance(res.data?.balance || 0)
    } catch (err) {
      console.log(err.response?.data)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
 

  const handleSalary = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4000/users/salary",
        { salary: Number(inputSalary) },
        config
      )

      setSalary(res.data.salary)
      setBalance(res.data.remainingBalance)
      setInputSalary("")
    } catch (err) {
      console.log(err.response?.data)
    }
  }

  const handleExpense = async () => {
    try {      
      if (!amount || !desc) {
        return alert("Please fill all fields")
      }
      const res = await axios.post(
        "http://localhost:4000/expense",
        {
          amount: Number(amount),
          description: desc
        },
        config
      )

      setBalance(res.data.remainingBalance)
      setAmount("")
      setDesc("")
      fetchData()
    } catch (err) {
      console.log(err.response?.data)
    }
  }
  const handleLogOut = () => {
    localStorage.removeItem("token")
    
    navigate("/login")
  }

  let handleShow = async() => {
    try {
      let res = await axios.get("http://localhost:4000/users/all")
      setShowAllUser(res.data.users)
      console.log("Data",res.data.users)
    } catch (error) {
      console.log("Error",error.response.data||error.message)
    }
  console.log("hello")
  }
  let handleClick = async(id) => {
    try {
      await axios.delete(`http://localhost:4000/users/delete/${id}`)
      alert("user deleted success")
      fetchData()
      // console.log(id)
    } catch (error) {
      console.log(error)
    }
  // console.log("hy")
  }
  return (
    <div className="min-h-screen bg-linear-to-br from-pink-100 via-purple-100 to-white p-6">
      {/* log out */}
<div className="flex justify-end mb-4 pr-2">
  <button
    onClick={handleLogOut}
    className="bg-linear-to-r from-pink-500 to-purple-500 text-white px-5 py-2 rounded-lg shadow-md hover:from-purple-500 hover:to-pink-500 hover:scale-105 transition-all duration-300"
  >
    🚪 Logout
  </button>
</div>
      <h1 className="text-4xl font-bold text-purple-700 mb-6 text-center">
        💰 Dashboard
      </h1>
      <button onClick={handleShow} className="bg-linear-to-r from-teal-300 to-teal-500 text-white p-2 mt-3 w-50 mb-2 rounded hover:opacity-90 cursor-pointer">Primium user</button>
      <div>
 {showAllUser.map((user) => {
  return (
    <div key={user.id}>
      <h2>{user.name}</h2>
      <p><b>Total Expenses:</b> {user.totalExpense}</p>
      {user.expenses?.map((exp) => (
        <p key={exp.id}>Amount: {exp.amount}</p>
      ))}
      <button onClick={()=>handleClick(user.id)}>Delete Expense</button>
    </div>
  );
})}
</div>
      {/*user Details  */}
 <UserDetail/>
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Salary Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 border border-pink-200">
          <h2 className="text-lg font-semibold text-gray-700">
            Salary: <span className="text-purple-600 font-bold">₹{salary}</span>
          </h2>

          <input
            type="number"
            value={inputSalary}
            onChange={(e) => setInputSalary(e.target.value)}
            className="border border-pink-300 focus:outline-none focus:ring-2 focus:ring-purple-400 p-2 mt-3 w-full rounded"
          />

          <button
            onClick={handleSalary}
            className="bg-linear-to-r from-pink-500 to-purple-500 text-white p-2 mt-3 w-full rounded hover:opacity-90"
          >
            Update Salary
          </button>
        </div>

        {/* Balance Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 border border-purple-200 flex items-center justify-center">
          <h2 className="text-xl font-bold text-purple-700">
            Balance: ₹{balance}
          </h2>
        </div>

      </div>

      {/* Add Expense */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-6 border border-pink-200">
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="number"
            placeholder="Amount"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border border-pink-300 p-2 rounded w-full focus:ring-2 focus:ring-purple-400"
          />

          <input
            type="text"
            required
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="border border-purple-300 p-2 rounded w-full focus:ring-2 focus:ring-pink-400"
          />

          <button
            onClick={handleExpense}
            className="bg-linear-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded hover:opacity-90"
          >
            Add
          </button>
        </div>
      </div>

      {/* Expenses List */}
   <ExpenseList expenses={expenses} />

    </div>
  )
}

export default Dashboard