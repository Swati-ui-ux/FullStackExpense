const User = require("../model/User")
require("dotenv").config()
const bcrypt= require('bcrypt')
const jwt = require("jsonwebtoken")
const { Expense } = require("../model")
const signUpUser = async (req,res) => {
    try {
    console.log("Body",req.body)
        const { name, email, password } = req.body
        const hashedPassword = await bcrypt.hash(password,10)
    // console.log(name,email,password)
    const user = await User.create({ name, email, password:hashedPassword })
    if(!user) return res.status(404).json({messsage:"User not created"})
    res.status(201).json({messsage:"User createdsuccefully",user})
    
} catch (error) {
    console.log("Errorn in",error)
    res.status(500).json({messsage:"Error when user sign up",error})
}

}

const loginUser = async (req,res) => {
    
    try {
        const { email, password } = req.body
        const user = await User.findOne({ where: { email } })
         if (!user) {
        return res.status(404).json({ message: "User not found" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
          return res.status(401).json({ message: "Invalid password" })
        
        }
        const token = jwt.sign(
  { id: user.id, email: user.email },
  process.env.MY_SECRET_KEY,
  { expiresIn: "7d" }
)

        
        console.log("Token mil gya----------------- ",token)
        res.status(200).json({message:"login success",token})
    } catch (error) {
         res.status(500).json({message:"error in login "})
    }
}



const getUserData = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "name", "email", "salary", "remainingBalance"]
    })

    res.json(user)

  } catch (err) {
    res.status(500).json({ message: "Error fetching user" })
  }
}

const updateSalary = async (req, res) => {
  try {
    const { salary } = req.body

    const user = await User.findByPk(req.user.id)

    const diff = salary - user.salary

    user.salary = salary
    user.remainingBalance += diff

    await user.save()

    res.json({
      salary: user.salary,
      remainingBalance: user.remainingBalance
    })

  } catch (err) {
    res.status(500).json({ message: "Error updating salary" })
  }
}
let getAllUser =async (req,res) => {
  try {
    let users = await User.findAll({
      include: [
      {model:Expense}
      ]
    })
    console.log(users)
    res.status(200).json({users})
  } catch (error) {
   res.status(200).json({message:"server error"})
  }
}

module.exports = {signUpUser,loginUser,getUserData,updateSalary,getAllUser}