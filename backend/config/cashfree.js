const { Cashfree } = require("cashfree-pg");
require("dotenv").config();

// ✅ instance create
const cashfree = new Cashfree(
  Cashfree.SANDBOX, // environment
  process.env.APPID,
  process.env.CASHFREE_SECRET_KEY
);

module.exports = cashfree;