import React from "react";

const ExpenseReport = () => {
  const expenses = [
    { date: "01-03-2021", desc: "Milk", category: "Milk", income: 0, expense: 60 },
    { date: "04-03-2021", desc: "Salary", category: "Salary", income: 40000, expense: 0 },
    { date: "04-03-2021", desc: "Fruits", category: "Fruits", income: 0, expense: 500 },
    { date: "04-03-2021", desc: "Medicines", category: "Health", income: 0, expense: 50 },
    { date: "05-03-2021", desc: "Salary", category: "Salary", income: 20000, expense: 0 },
    { date: "05-03-2021", desc: "Milk", category: "Milk", income: 0, expense: 60 },
    { date: "05-03-2021", desc: "Fees", category: "Education", income: 0, expense: 4000 },
    { date: "05-03-2021", desc: "Party", category: "Birthday Treat", income: 0, expense: 500 },
    { date: "05-03-2021", desc: "Travel", category: "Transport", income: 0, expense: 500 },
  ];

  const totalIncome = expenses.reduce((acc, e) => acc + e.income, 0);
  const totalExpense = expenses.reduce((acc, e) => acc + e.expense, 0);
  const savings = totalIncome - totalExpense;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6">

        {/* Header */}
        <h1 className="text-2xl font-bold text-center text-teal-600">
          Day to Day Expenses
        </h1>
        <p className="text-sm text-gray-500 mt-2">16 March 2021, 01:16 PM</p>

        <h2 className="text-center text-lg font-semibold mt-4">2021</h2>
        <h3 className="text-center text-md text-gray-600 mb-4">
          March 2021
        </h3>

        {/* Table */}
        <table className="w-full border border-gray-300 text-sm">
          <thead className="bg-teal-600 border border-teal-500 text-white">
            <tr>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Income</th>
              <th className="p-2 border">Expense</th>
            </tr>
          </thead>

          <tbody>
            {expenses.map((item, i) => (
              <tr key={i} className="text-center even:bg-gray-100">
                <td className="p-2 border">{item.date}</td>
                <td className="p-2 border">{item.desc}</td>
                <td className="p-2 border">{item.category}</td>
                <td className="p-2 border  border-black text-green-600">
                  {item.income ? `₹ ${item.income}` : "-"}
                </td>
                <td className="p-2 border border-black text-red-500">
                  {item.expense ? `₹ ${item.expense}` : "-"}
                </td>
              </tr>
            ))}

            {/* Summary */}
            <tr className="font-bold bg-gray-200 text-center">
              <td colSpan="3" className="p-2 border">Total</td>
              <td className="p-2 border border-black text-green-600">
                ₹ {totalIncome}
              </td>
              <td className="p-2 border border-black text-red-500">
                ₹ {totalExpense}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Savings */}
        <div className="text-right mt-2 font-semibold text-blue-600">
          Savings = ₹ {savings}
        </div>

        {/* Yearly Report */}
        <h2 className="mt-6 font-semibold text-center">Yearly Report</h2>

        <table className="w-full border mt-2 text-sm">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="p-2 border">Month</th>
              <th className="p-2 border">Income</th>
              <th className="p-2 border">Expense</th>
              <th className="p-2 border">Savings</th>
            </tr>
          </thead>

          <tbody>
            <tr className="text-center">
              <td className="p-2 border">March</td>
              <td className="p-2 border  border-black text-green-600">₹ {totalIncome}</td>
              <td className="p-2 border border-black text-red-500">₹ {totalExpense}</td>
              <td className="p-2 border  border-black text-blue-600">₹ {savings}</td>
            </tr>
          </tbody>
        </table>

        {/* Notes */}
        <h2 className="mt-6 font-semibold text-center">Notes Report 2021</h2>

        <table className="w-full border mt-2 text-sm">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Notes</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="p-2 border">11-02-2021</td>
              <td className="p-2 border">Gave advance to construction.</td>
            </tr>
            <tr>
              <td className="p-2 border">16-02-2021</td>
              <td className="p-2 border">Random note</td>
            </tr>
            <tr>
              <td className="p-2 border">17-02-2021</td>
              <td className="p-2 border">17 17 17</td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default ExpenseReport;