import React from "react";

const ExpenseList = ({
  expenses,
  onDelete,
  onEdit,
  page,
  setPage,
  totalPages,
  limit,setLimit
}) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDay = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      weekday: "long",
    });
  };

  return (
    <>
      {/* Expense Cards */}
      <div>
          Expenses: 
        <select value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setPage(1)
          }}
           className="ml-2 border px-2 py-1"
        >
        <option value="2">2</option>
        <option value="5">5</option>
          <option value="10">10</option>
        <option value="20">20</option>
          
        </select>
      </div>
      <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {expenses.length === 0 ? (
          <p className="text-gray-500 text-center col-span-full">
            No expenses
          </p>
        ) : (
          expenses.map((exp) => (
            <div
              key={exp.id}
              className="bg-white shadow-md rounded-xl p-4 border border-purple-100 flex flex-col gap-2 hover:shadow-lg transition"
            >
              {/* Amount + Buttons */}
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-green-600">
                  ₹ {exp.amount}
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(exp)}
                    className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(exp.id)}
                    className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700 font-medium break-words">
                {exp.description}
              </p>

              {/* Date */}
              <div className="flex flex-col sm:flex-row sm:justify-between text-sm">
                <span className="text-purple-500 font-semibold">
                  {formatDay(exp.createdAt)}
                </span>
                <span className="text-gray-400">
                  {formatDate(exp.createdAt)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-3 items-center">
        <button
          disabled={page === 1}
         onClick={() => setPage(prev => prev - 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="px-3 py-1 font-medium">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
        onClick={() => setPage(prev => prev + 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default ExpenseList;