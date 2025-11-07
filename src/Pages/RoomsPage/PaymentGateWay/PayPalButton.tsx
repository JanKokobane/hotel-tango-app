import React from "react";
import { useEffect } from "react";

interface PayPalButtonProps {
  amount: string;
  onSuccess: () => void;
  bookingData: {
    id: string;
    room_id: number;
    room_name: string;
    full_name: string;
    email: string;
    total_price: number;
  };
}

declare global {
  interface Window {
    paypal?: {
      Buttons: (config: {
        createOrder: (
          data: unknown,
          actions: {
            order: {
              create: (details: {
                purchase_units: { amount: { value: string } }[];
              }) => Promise<string>;
            };
          }
        ) => Promise<string>;
        onApprove: (
          data: { orderID: string },
          actions: { order: { capture: () => Promise<unknown> } }
        ) => Promise<void>;
        onError?: (err: Error) => void;
      }) => { render: (selector: string) => Promise<void> };
    };
  }
}

function PayPalButton({ amount, onSuccess, bookingData }: PayPalButtonProps) {
  useEffect(() => {
    if (window.paypal) {
      renderPayPalButton();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${
      import.meta.env.VITE_PAYPAL_CLIENT_ID
    }&currency=USD`;
    script.async = true;

    script.addEventListener("load", renderPayPalButton);
    script.addEventListener("error", () => {
      console.error("Failed to load PayPal SDK");
    });

    document.body.appendChild(script);

    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, [amount]);

  const renderPayPalButton = () => {
    if (!window.paypal) return;

    const container = document.getElementById("paypal-button-container");
    if (container) container.innerHTML = "";

    window.paypal
      .Buttons({
        createOrder: (data, actions) =>
          actions.order.create({
            purchase_units: [{ amount: { value: amount } }],
          }),
        onApprove: async (data, actions) => {
          const details = await actions.order.capture();
          console.log("Payment successful:", details);
          console.log("✅ Payment verified successfully, sending to backend");
          console.log("📦 Sending bookingData:", bookingData);

          try {
            await fetch(
              "https://tango-hotel-backend.onrender.com/api/bookings/verify-payment",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderID: data.orderID, bookingData }),
              }
            );
            onSuccess();
          } catch (error) {
            console.error("Failed to confirm booking:", error);
            alert(
              "Payment successful but failed to confirm booking. Please contact support."
            );
          }
        },
        onError: (err) => {
          console.error("PayPal error:", err);
          alert("Payment failed. Please try again.");
        },
      })
      .render("#paypal-button-container");
  };

  return <div id="paypal-button-container" />;
}

export default PayPalButton;
