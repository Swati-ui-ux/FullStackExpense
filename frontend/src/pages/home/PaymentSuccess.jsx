import React, { useEffect } from "react";
import axios from "axios";

const PaymentSuccess = () => {
  const token = localStorage.getItem("token");
  const order_id = localStorage.getItem("order_id");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const res = await axios.post(
          "http://localhost:4000/payment/verify-payment",
          { order_id },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        console.log("verify:", res.data);

      } catch (err) {
        console.log(err);
      }
    };

    verifyPayment();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-2xl text-green-600 font-bold">
        🎉 Payment Successful!
      </h1>
    </div>
  );
};

export default PaymentSuccess;