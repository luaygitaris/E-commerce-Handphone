import React from "react";
import type { CartItem } from "../context/cart.types";

interface Props {
  cartItems: CartItem[];
  onCheckout: () => void;
  onRemoveItem: (id: string) => void;
  onIncreaseQuantity: (id: string) => void;
  onDecreaseQuantity: (id: string) => void;
}

const Cart: React.FC<Props> = ({
  cartItems,
  onCheckout,
  onRemoveItem,
  onIncreaseQuantity,
  onDecreaseQuantity,
}) => {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="p-5 rounded-xl shadow-lg bg-white max-h-[70vh] overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-start border-b pb-4 gap-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full sm:w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-sm sm:text-base">{item.name}</h3>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-700 text-lg font-bold"
                  >
                    ×
                  </button>
                </div>
                <p className="text-gray-500 text-sm">{item.description}</p>
                <div className="flex justify-between items-center mt-3">
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <button
                      onClick={() => onDecreaseQuantity(item.id)}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                    >
                      -
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      onClick={() => onIncreaseQuantity(item.id)}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>
                  <p className="font-semibold text-gray-700">
                    Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <div className="border-t pt-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>Rp {total.toLocaleString("id-ID")}</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 mt-4 rounded-lg transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
