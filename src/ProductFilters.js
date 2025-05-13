import React from "react";

const ProductFilters = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <select name="brand" onChange={handleChange} className="border p-1 rounded">
        <option value="">كل المصانع</option>
        <option value="WTF">WTF</option>
        <option value="Vaporesso">Vaporesso</option>
        <option value="Line">Line</option>
      </select>

      <select name="concentration" onChange={handleChange} className="border p-1 rounded">
        <option value="">كل التركيزات</option>
        <option value="12.5">12.5 mg</option>
        <option value="25">25 mg</option>
        <option value="50">50 mg</option>
      </select>

      <select name="size" onChange={handleChange} className="border p-1 rounded">
        <option value="">كل الأحجام</option>
        <option value="30">30 ml</option>
        <option value="60">60 ml</option>
        <option value="100">100 ml</option>
      </select>
    </div>
  );
};

export default ProductFilters;