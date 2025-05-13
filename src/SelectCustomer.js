import React, { useEffect, useState } from "react";
import axios from "axios";

function SelectCustomer({ onSelect }) {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios
      .get("/api/thirdparties", {
        headers: {
          DOLAPIKEY: "s2QFgR71ia3i07cbgmBU9ZD7YbM3WeU5",
          Accept: "application/json"
        }
      })
      .then((response) => {
        if (Array.isArray(response.data)) {
          setCustomers(response.data);
        } else {
          console.error("Unexpected API response for customers:", response.data);
        }
      })
      .catch((error) => {
        console.error("فشل تحميل العملاء", error);
      });
  }, []);

  return (
    <select className="select-style" onChange={(e) => onSelect(e.target.value)}>
      <option value="">-- اختر عميلًا --</option>
      {customers.map((customer) => (
        <option key={customer.id} value={customer.id}>
          {customer.name}
        </option>
      ))}
    </select>
  );
}

export default SelectCustomer;

