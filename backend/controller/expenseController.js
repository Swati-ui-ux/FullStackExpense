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
  await User.increment(
   { totalExpense: amount},
    {where:{id:req.user.id}}
  )
  user.remainingBalance -= amount
  await user.save()

  res.json({
    expense,
    remainingBalance: user.remainingBalance
  })
}

// 📋 Get Expenses
const getExpenses = async (req, res) => {
  try {
    
  const page = parseInt(req.query.page)
  const limit = 5;
  const offset = (page - 1) * limit;
  console.log("Query page:💌💌💌💌", req.query.page);
  const {count,rows} = await Expense.findAndCountAll({
    where: { userId: req.user.id },
    limit,
    offset,
    order: [["createdAt", "DESC"]]
  })
console.log("page ",page,"Offset " ,offset)
  res.json({
      expenses: rows,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
  });
  } catch (error) {
     res.status(500).json({ message: "Error" });
  }
  
}

module.exports = { addExpense, getExpenses }