const Cashfree = require("../config/cashfree");
const { User } = require("../model");

// ✅ BUY PREMIUM
exports.buyPremium = async (req, res) => {
  try {
    const orderId = "order_" + Date.now();

    const request = {
      order_id: orderId,
      order_amount: 100,
      order_currency: "INR",
      customer_details: {
        customer_id: req.user.id.toString(),
        customer_email: "test@gmail.com",
        customer_phone: "9999999999"
      }
    };

    // 🔥 OLD METHOD
    const response = await Cashfree.PGCreateOrder(request);
console.log("ORDER STATUS:", response.data.order_status);
    res.json({
      payment_session_id: response.data.payment_session_id,
      order_id: orderId
    });

  } catch (err) {
    console.log("Order Error:", err);
    res.status(500).json({ message: "Order failed" });
  }
};

// ✅ VERIFY PAYMENT
exports.verifyPayment = async (req, res) => {
  try {
    const { order_id } = req.body;

    // 🔥 OLD METHOD
    const response = await Cashfree.PGFetchOrder(order_id);

    if (response.data.order_status === "PAID") {
      await User.update(
        { isPremium: true },
        { where: { id: req.user.id } }
      );

      return res.json({ success: true });
    }
console.log("Response",response)
    res.json({ success: false });

  } catch (err) {
    console.log("Verify Error:", err);
    res.status(500).json({ message: "Verification failed" });
  }
};