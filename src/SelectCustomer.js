import React, { useState, useEffect } from "react";
import axios from "axios";

const SelectCustomer = ({ selectedCustomer, onChange }) => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("/api/thirdparties", {
          headers: {
            "DOLAPIKEY": "s2QFgR71ia3i07cbgmBU9ZD7YbM3WeU5",  
            Accept: "application/json" // 🔁 استبدلها بمفتاحك الفعلي
          }
        });
        setCustomers(response.data);
      } catch (error) {
        console.error("فشل تحميل العملاء:", error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div className="mb-4">
      <label className="block mb-1 font-bold">👤 اختر العميل</label>
      <select
        value={selectedCustomer}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded px-2 py-1 w-full"
      >
        <option value="">اختر عميلًا</option>
        {customers.map((customer) => (
          <option key={customer.id} value={customer.id}>
            {customer.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectCustomer;
