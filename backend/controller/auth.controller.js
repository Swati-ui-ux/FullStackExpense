const User = require('../model/User');
const { generateResetToken } = require('../utils/token.util');
const { sendResetEmail } = require('../services/email.service');
const bcrypt = require('bcrypt')
const { Op } = require('sequelize')
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email required" });
    }

    const user = await User.findOne({ where: { email } });

    // Security reason: same response
    if (!user) {
      return res.json({ message: "If email exists, link sent" });
    }

    const token = generateResetToken();

    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;

    await user.save();

    await sendResetEmail(email, token);

    res.json({ message: "Reset link sent to email" });

  } catch (error) {
    console.log("Error from forgotPassword:", error);
    res.status(500).json({ message: "Server error" });
  }
};



const resetPassword = async (req, res) => {
  try {
    const { token } = req.params
    const { password } = req.body
console.log(password)
    if (!password) {
      return res.status(400).json({ message: "Password required" })
    }

    // 🔍 user find using token + expiry check
    const user = await User.findOne({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          [Op.gt]: new Date()
        }
      }
    })

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" })
    }

    // 🔐 password hash
    const hashedPassword = await bcrypt.hash(password, 10)

    // update user
    user.password = hashedPassword
    user.resetToken = null
    user.resetTokenExpiry = null

    await user.save()

    res.json({ message: "Password reset successful" })

  } catch (error) {
    console.log("Reset Error:", error)
    res.status(500).json({ message: "Server error" })
  }
}


module.exports = { forgotPassword,resetPassword };