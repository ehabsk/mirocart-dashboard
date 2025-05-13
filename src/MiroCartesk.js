import React, { useState } from "react";
import MiroCartProducts from "./MiroCartProducts";
import SelectSalesRep from "./SelectSalesRep";
import SelectCustomer from "./SelectCustomer";
import { sendOrder } from "./sendOrder";

const MiroCart = () => {
  const [cart, setCart] = useState([]);
  const [salesRepId, setSalesRepId] = useState("");
  const [customerId, setCustomerId] = useState("");

  const handleSendOrder = () => {
  const cartSnapshot = [...cart]; // ✅ نسخة ثابتة في لحظتها
    sendOrder(cart, setCart, customerId, salesRepId);
  };

  const addToCart = (productWithQuantity) => {
    const updatedCart = [...cart];
    const existingIndex = updatedCart.findIndex(item => item.id === productWithQuantity.id);

    if (existingIndex !== -1) {
      updatedCart[existingIndex].qty += productWithQuantity.qty;
    } else {
      updatedCart.push({ ...productWithQuantity });
    }

    setCart(updatedCart);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">🛒 MiroCart</h1>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        <SelectSalesRep selectedRep={salesRepId} onChange={setSalesRepId} />
        <SelectCustomer selectedCustomer={customerId} onChange={setCustomerId} />
        <button
          onClick={handleSendOrder}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          📤 إرسال الطلب
        </button>
      </div>

      <MiroCartProducts
        cart={cart}
        setCart={setCart}
        addToCart={addToCart}
        salesRepId={salesRepId}
        customerId={customerId}
      />
    </div>
  );
};

export default MiroCart;
