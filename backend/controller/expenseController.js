const Expense = require("../model/expense")
const User = require("../model/User")

// ➕ Add Expense
const addExpense = async (req, res) => {
  const { amount, description } = req.body

  const user = await User.findByPk(req.user.id)

  if (user.remainingBalance < amount) {
    return res.status(400).json({ message: "Low balance" })
  }

  const expense = await Expense.create({
    amount,
    description,
    userId: req.user.id
  })

  user.remainingBalance -= amount
  await user.save()

  res.json({
    expense,
    remainingBalance: user.remainingBalance
  })
}

// 📋 Get Expenses
const getExpenses = async (req, res) => {
  const expenses = await Expense.findAll({
    where: { userId: req.user.id },
    order: [["createdAt", "DESC"]]
  })

  const user = await User.findByPk(req.user.id)

  res.json({
    expenses,
    balance: user.remainingBalance
  })
}

module.exports = { addExpense, getExpenses }