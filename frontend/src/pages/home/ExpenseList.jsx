import React from 'react'

const ExpenseList = ({expenses}) => {
    
  const formatDate = (date) => {
  return new Date(date).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    
  })
    }
    
    
const formatDay = (date) => {
  return new Date(date).toLocaleDateString("en-IN", {
    weekday: "long"
  })
}
  return (
       <div className="space-y-3">
        {expenses.length === 0 ? (
          <p className="text-gray-500 text-center">No expenses</p>
        ) : (
          expenses.map((exp) => (
            <div
              key={exp.id}
              className="bg-white shadow-md rounded-lg p-4 border border-purple-100 flex justify-between"
            >
              <span className="text-gray-700 font-medium">
                ₹{exp.amount}
              </span>
              <span className="text-pink-600">
                {exp.description}
              </span>
                <span className="text-s text-purple-500 font-semibold">
    {formatDay(exp.createdAt)}
  </span>
              <span className="text-s text-gray-400">
    {formatDate(exp.createdAt)}
  </span>
            </div>
          ))
        )}
      </div>
  )
}

export default ExpenseList