const express = require("express")
const { addExpense, getExpenses, deleteExpense } = require("../controller/expenseController")
const auth = require("../middleware/authMiddleware")
const { updateSalary } = require("../controller/userController")
const router = express.Router()


router.post("/",auth, addExpense)
router.get("/", auth, getExpenses)
router.delete("/:id", auth, deleteExpense)

router.post("/salary", auth, updateSalary)

module.exports = router