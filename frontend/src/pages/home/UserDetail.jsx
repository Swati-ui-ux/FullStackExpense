import React, { useContext, useEffect, useState } from "react"
import axios from "axios"
import { AuthContext } from "../../context/AuthContext"

const UserDetail = () => {
 
 let {user,totalExpense,isPremium,fetchUser} = useContext(AuthContext)
  const token = localStorage.getItem("token")



  useEffect(() => {
    fetchUser()
  }, [])
 
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
    <>
      {!isPremium ? (
  <button
    onClick={handleBuyPremium}
    className="bg-yellow-500 text-white px-4 py-2 rounded mt-3"
  >
    💎 Buy Premium
  </button>
) : (
  <p className="text-green-600 font-bold mt-3">✅ Premium User</p>
)}
    <div className="flex justify-center items-center mb-4">
      
      {user ? (
        <div className="bg-white shadow-lg rounded-2xl p-6 w-[80%] border border-purple-200 text-center">

          <h2 className="text-2xl font-bold text-purple-700 mb-2">
            👋 Welcome, {user.name}
          </h2>

          <hr className="my-3" />

          <p className="text-gray-700">
            📧 <span className="font-semibold">Email:</span> {user.email}
          </p>

          <p className="text-gray-700 mt-2">
            💰 <span className="font-semibold">Salary:</span> ₹{user.salary}
          </p>

          <p className="text-gray-700 mt-2">
            🏦 <span className="font-semibold">Remaining Balance:</span> ₹{user.remainingBalance}
          </p>

          <h3 className="mt-4 text-lg font-semibold text-purple-600">
            📊 Total Expense: ₹{totalExpense}
          </h3>

        </div>
      ) : (
        <p className="text-gray-600">Loading...</p>
      )}

    </div>
</>
  )
}

export default UserDetail