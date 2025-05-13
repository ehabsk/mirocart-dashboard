import React from "react";

function ProductCard({ product }) {
  if (!product || typeof product !== "object") {
    return <div className="p-4 bg-red-100 text-red-800 rounded">بيانات المنتج غير متوفرة</div>;
  }

  const {
    ref = "غير معروف",
    country_code = "غير محدد",
    status = "غير معروف",
    id = "؟"
  } = product;

  return (
    <div className="border p-4 rounded shadow-sm bg-white hover:shadow-md transition">
      <h2 className="text-lg font-bold mb-2">منتج رقم #{ref}</h2>
      <p>📦 الحالة: {status === "1" ? "نشط" : "غير نشط"}</p>
      <p>🌍 الدولة: {country_code}</p>
      <p>🆔 ID: {id}</p>
    </div>
  );
}

export default ProductCard;
