import React, { useEffect, useState } from "react";
import axios from "axios";

const SelectSalesRep = ({ selectedRep, onChange }) => {
  const [salesReps, setSalesReps] = useState([]);
  const [loading, setLoading] = useState(true);
  const DOLIBARR_API_URL = "/api/users"; // تأكد من المسار
  const DOLAPIKEY = "s2QFgR71ia3i07cbgmBU9ZD7YbM3WeU5"; // ← حط المفتاح الصحيح هنا أو من config

  useEffect(() => {
    const fetchSalesReps = async () => {
      try {
        const response = await axios.get(DOLIBARR_API_URL, {
          headers: {
            "DOLAPIKEY": DOLAPIKEY
          }
        });
        setSalesReps(response.data);
      } catch (error) {
        console.error("فشل تحميل رجال البيع:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesReps();
  }, []);

  return (
    <div className="mb-4">
      <label htmlFor="salesRep" className="block mb-1 font-semibold">اختر رجل البيع:</label>
      {loading ? (
        <p>⏳ جاري التحميل...</p>
      ) : (
        <select
          id="salesRep"
          className="border rounded px-2 py-1"
          value={selectedRep}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">-- اختر --</option>
          {salesReps.map((rep) => (
            <option key={rep.id} value={rep.id}>
              {rep.firstname} {rep.lastname}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default SelectSalesRep;

