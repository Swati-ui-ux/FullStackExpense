import React from 'react'
import { useContext ,useState} from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
const CheckPremium = () => {
  let { isPremium, setIsPremium } = useContext(AuthContext)
   let navigate = useNavigate()
  const handleBuyPremium = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get("http://localhost:4000/payment/buy-premium", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const { payment_session_id, order_id } = res.data;

    const cashfree = window.Cashfree({
      mode: "sandbox"
    });

    await cashfree.checkout({
      paymentSessionId: payment_session_id,
      redirectTarget: "_modal"
    });

    // 🔥 ALWAYS verify (condition hata di)
    const verifyRes = await axios.post(
      "http://localhost:4000/payment/verify-payment",
      { order_id },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log("verify response:", verifyRes.data);

    if (verifyRes.data.success) {
      alert("🎉 Premium Activated!");
      window.location.reload();
    } else {
      alert("Payment not completed yet ❌");
    }

  } catch (err) {
    console.log(err);
  }
};
  return (
    <div>
     <button
    onClick={handleBuyPremium}
    className="bg-yellow-500 ml-4 text-white px-4 py-2 rounded mt-3 cursor-pointer"
  >
    💎 Buy Premium
      </button>
      
    <button onClick={() => navigate("/")}  className="bg-green-500 ml-4 text-white px-4 py-2 rounded mt-3 cursor-pointer">Go Back</button>
    </div>
  )
}

export default CheckPremium