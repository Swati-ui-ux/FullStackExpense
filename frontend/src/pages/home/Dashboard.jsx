import React, { useContext, useEffect, useState } from "react"
import axios from "axios"
import ExpenseList from "./ExpenseList"
import { Link, useNavigate } from "react-router-dom"
import UserDetail from "./UserDetail"
import Logout from "./Logout"
import { AuthContext } from "../../context/AuthContext"
const Dashboard = () => {
  const{updateSalary, addExpense, deleteExpense} = useContext(AuthContext)
  const [salary, setSalary] = useState(0)
  const [balance, setBalance] = useState(0)
  const [inputSalary, setInputSalary] = useState("")
  const [amount, setAmount] = useState("")
  const [desc, setDesc] = useState("")
  const [expenses, setExpenses] = useState([])
  const [showAllUser, setShowAllUser] = useState([])
 
  const [limit ,setLimit] = useState(5)
  const [page, setPage] = useState(() => {
  return Number(localStorage.getItem("page")) || 1;
  })
const { isPremium } = useContext(AuthContext)
const [totalPages, setTotalPages] = useState(1);
const navigate = useNavigate()
const token = localStorage.getItem("token")

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
   const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/expense?page=${page}&limit=${limit}`, config)
      if (res.data.expenses.length === 0 && page > 1) {
    setPage(prev => prev - 1);
    return; // ⚠️ important (warna infinite loop ho jayega)
  }
    //  console.log(res)
      setExpenses(res.data.expenses)
      setTotalPages(res.data.totalPages)
      // setBalance(res.data?.balance || 0)
    } catch (err) {
      console.log(err.response?.data)
    }
  }

  useEffect(() => {
    fetchData()
     localStorage.setItem("page", page);
  }, [page,limit])
 

  const handleSalary = async () => {
    if(inputSalary==0)return alert("Salary cannot be zero")
    updateSalary(inputSalary)
    setInputSalary("")
  }

  const handleExpense = async () => {
        
      if (!amount || !desc) {
        return alert("Please fill all fields")
      }
      
      addExpense(amount, desc)
      setAmount("")
      setDesc("")
      fetchData()
  }
  
  let handleDelete = async (id, amount) => {
   deleteExpense(id,amount)
  }
  
  return (
    <div className="min-h-screen bg-linear-to-br from-pink-100 via-purple-100 to-white p-6">
      <div className="flex items-center justify-around">
        <span className="bg-linear-to-r from-purple-400 to-pink-500 text-white p-2 mr-4 mt-3 w-50 mb-2 rounded hover:opacity-90 cursor-pointer"><Link to={isPremium ? '/expense-report' : "/check-premium"}>Expense Report</Link> </span>
      
      {/* log out */}
        <Logout />
      </div>
     
      <h1 className="text-4xl font-bold text-purple-700 mb-6 text-center">
        💰 Dashboard
      </h1>
    
      {/*user Details  */}
 <UserDetail/>
      <div className="w-[80%] m-auto mb-6">
        {/* Salary Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 border border-pink-200">
          <h2 className="text-lg font-semibold text-gray-700">
            Salary: <span className="text-purple-600 font-bold">₹{salary}</span>
          </h2>

          <input
            type="number"
            value={inputSalary}
            required
            onChange={(e) => setInputSalary(e.target.value)}
            className="border border-pink-300 focus:outline-none focus:ring-2 focus:ring-purple-400 p-2 mt-3 w-full rounded"
          />

          <button
            onClick={handleSalary}
            className="bg-linear-to-r from-pink-500 to-purple-500 text-white p-2 mt-3 w-full rounded hover:opacity-90"
          >
            Add Salary
          </button>
        </div>

      </div>

      {/* Add Expense */}
      <div className="bg-white shadow-lg rounded-xl w-[80%] m-auto p-6 mb-6 border border-pink-200">
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
   <ExpenseList expenses={expenses}
      onDelete={(id) =>handleDelete(id)}
      onEdit={(exp) => console.log("edit", exp)}
      page={page}
      setPage={setPage}
        totalPages={totalPages}
        limit={limit}
        setLimit={setLimit}
      />
    </div>
  )
}

export default Dashboard