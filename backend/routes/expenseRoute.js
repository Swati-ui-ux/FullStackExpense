const express = require("express")
const { addExpense, getExpenses } = require("../controller/expenseController")
const auth = require("../middleware/authMiddleware")
const { updateSalary } = require("../controller/userController")
const router = express.Router()


router.post("/",auth, addExpense)
router.get("/", auth, getExpenses)
router.post("/salary", auth, updateSalary)
module.exports = router