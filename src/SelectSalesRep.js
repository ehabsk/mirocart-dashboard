import React, { useEffect, useState } from "react";
import axios from "axios";

function SelectSalesRep({ onSelect }) {
  const [salesReps, setSalesReps] = useState([]);

  useEffect(() => {
    axios
      .get("/api/users", {
        headers: {
          DOLAPIKEY: "s2QFgR71ia3i07cbgmBU9ZD7YbM3WeU5",
          Accept: "application/json"
        }
      })
      .then((response) => {
        if (Array.isArray(response.data)) {
          setSalesReps(response.data);
        } else {
          console.error("Unexpected API response for sales reps:", response.data);
        }
      })
      .catch((error) => {
        console.error("فشل تحميل رجال البيع", error);
      });
  }, []);

  return (
    <select className="select-style" onChange={(e) => onSelect(e.target.value)}>
      <option value="">-- اختر --</option>
      {salesReps.map((rep) => (
        <option key={rep.id} value={rep.id}>
          {rep.firstname} {rep.lastname}
        </option>
      ))}
    </select>
  );
}

export default SelectSalesRep;

