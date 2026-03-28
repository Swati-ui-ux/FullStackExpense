const jwt = require("jsonwebtoken")
require("dotenv").config()
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization
console.log("Header is ok ",authHeader)
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token" })
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, process.env.MY_SECRET_KEY)
    req.user = decoded
    next()
  } catch {
    return res.status(401).json({ message: "Invalid token" })
  }
}

module.exports = authMiddleware