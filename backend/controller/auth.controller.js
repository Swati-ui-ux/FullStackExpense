const User = require('../model/User');
const { generateResetToken } = require('../utils/token.util');
const { sendResetEmail } = require('../services/email.service');

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

module.exports = { forgotPassword };