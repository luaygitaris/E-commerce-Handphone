import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface CheckoutItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Checkout: React.FC = () => {
  const [items, setItems] = useState<CheckoutItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("checkoutItems");
    if (stored) {
      setItems(JSON.parse(stored));
    }
  }, []);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleGoToPayment = () => {
    localStorage.setItem("checkoutTotal", JSON.stringify(total));
    navigate("/payment");
  };

  return (
    <div className="max-w-4xl mx-auto p-4 py-10 mt-10">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      {items.length === 0 ? (
        <p className="text-gray-500">Your checkout is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between border p-4 rounded-lg shadow-sm bg-white">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-bold text-gray-800">
                  Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t pt-4 flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>Rp {total.toLocaleString("id-ID")}</span>
          </div>

          <button
            onClick={handleGoToPayment}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
          >
            Pembayaran
          </button>
        </>
      )}
    </div>
  );
};

export default Checkout;
