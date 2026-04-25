const express = require("express")
const authMiddleware = require("../middleware/authMiddleware")
const { buyPremium,verifyPayment } = require("../controller/paymentController")

const router = express.Router()

router.get("/buy-premium", authMiddleware, buyPremium)
router.post("/verify-payment", authMiddleware, verifyPayment)

module.exports = router