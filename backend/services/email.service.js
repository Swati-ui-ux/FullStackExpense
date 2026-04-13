const SibApiV3Sdk = require('../config/brevo.config');

const sendResetEmail = async (email, token) => {
  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  const resetUrl = `http://localhost:5173/reset-password/${token}`;

  await apiInstance.sendTransacEmail({
    sender: {
      email: "swatigola274@gmail.com",
      name: "Expense Tracker"
    },
    to: [{ email }],
    subject: "Password Reset",
    htmlContent: `
      <h3>Forgot Password</h3>
      <p>Click below link to reset your password:</p>
      <a href="${resetUrl}">Reset Password</a>
    `
  });
};

module.exports = { sendResetEmail };