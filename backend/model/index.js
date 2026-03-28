const Expense = require("./expense")
const User = require("./User")

User.hasMany(Expense, { foreignKey: "userId" })
Expense.belongsTo(User, { foreignKey: "userId" })

module.exports={User,Expense}