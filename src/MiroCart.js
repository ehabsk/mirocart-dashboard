
import React, { useState } from "react";
import MiroCartProducts from "./MiroCartProducts";
import SelectSalesRep from "./SelectSalesRep";
import SelectCustomer from "./SelectCustomer";
import sendOrder from "./sendOrder";

const MiroCart = () => {
  const [cart, setCart] = useState([]);
  const [salesRepId, setSalesRepId] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [selectedFactory, setSelectedFactory] = useState("");
  const [selectedStrength, setSelectedStrength] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const resetFilters = () => {
    setSelectedFactory("");
    setSelectedStrength("");
    setSelectedSize("");
    setSalesRepId("");
    setCustomerId("");
  };

  const handleSendOrder = () => {
    if (cart.length === 0) {
      alert("❗ لا يمكن إرسال طلب فارغ.");
      return;
    }
    sendOrder(cart, setCart, customerId, salesRepId, resetFilters);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">🛒 MiroCart</h1>
      <div className="flex flex-wrap gap-4 items-center mb-4">
        <SelectSalesRep selectedRep={salesRepId} onChange={setSalesRepId} />
        <SelectCustomer selectedCustomer={customerId} onChange={setCustomerId} />
        <button onClick={handleSendOrder} className="bg-green-600 text-white px-4 py-2 rounded">
          📤 إرسال الطلب
        </button>
      </div>
      <MiroCartProducts
        cart={cart}
        setCart={setCart}
        addToCart={(productWithQuantity) => {
          const updatedCart = [...cart];
          const existingIndex = updatedCart.findIndex(item => item.id === productWithQuantity.id);
          if (existingIndex !== -1) {
            updatedCart[existingIndex].qty += productWithQuantity.qty;
          } else {
            updatedCart.push({ ...productWithQuantity });
          }
          setCart(updatedCart);
        }}
        selectedFactory={selectedFactory}
        setSelectedFactory={setSelectedFactory}
        selectedStrength={selectedStrength}
        setSelectedStrength={setSelectedStrength}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
      />
    </div>
  );
};

export default MiroCart;
