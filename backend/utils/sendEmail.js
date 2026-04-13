const sendResetEmail = async (email, resetToken) => {
  const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

  const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

  const sender = {
    email: "your_email@gmail.com",
    name: "Expense Tracker"
  };

  const receivers = [
    {
      email: email
    }
  ];

  await tranEmailApi.sendTransacEmail({
    sender,
    to: receivers,
    subject: "Reset Your Password",
    htmlContent: `
      <h3>Password Reset</h3>
      <p>Click below link to reset password:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>This link will expire in 15 minutes.</p>
    `
  });
}

module.exports = sendResetEmail