const express = require("express")
const { signUpUser, loginUser, getUserData, updateSalary, getAllUser, deleteUser } = require("../controller/userController")
const authMiddleware = require("../middleware/authMiddleware")

const router = express.Router()
router.get("/me", authMiddleware, getUserData)
router.post("/salary",authMiddleware,updateSalary)
router.post("/signup", signUpUser)
router.post("/login", loginUser)
router.get("/all", getAllUser)
router.delete("/delete/:id",deleteUser)
module.exports = router