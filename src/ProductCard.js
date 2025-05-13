import React from "react";

// تحليل متطور من escript
function parseEscript(escript) {
  let concentration = "؟";
  let size = "؟";
  let brand = "غير معروف";

  if (escript) {
    const parts = escript.split("|").map(p => p.trim().toLowerCase());

    for (let part of parts) {
      if (part.includes("mg") || (part.match(/^\d+(\.\d+)?$/) && parseFloat(part) < 100)) {
        concentration = part.includes("mg") ? part : part + "mg";
      }
      if (part.includes("ml") || (part.match(/^\d+(\.\d+)?$/) && parseFloat(part) >= 10)) {
        size = part.includes("ml") ? part : part + "ml";
      }
      if (part.includes("line")) {
        const brandPart = part.split("line")[1]?.trim();
        brand = brandPart ? brandPart : "Line";
      }
    }
  }

  return { concentration, size, brand };
}

function ProductCard({ product, addToCart }) {
  const [quantity, setQuantity] = React.useState(1);

  if (!product) return null;

  const { concentration, size, brand } = parseEscript(product.escript);

  return (
    <div className="border rounded p-4 shadow-md bg-white">
      <h2 className="font-bold text-lg mb-1">{product.label || "منتج بدون اسم"}</h2>
      <p>الكود: {product.ref}</p>
      
      <p>المصنع: {brand}</p>
      <p>السعر: {parseFloat(product.cost_price || 0).toFixed(2)} جنيه</p>

      <div className="flex items-center mt-2 space-x-2">
        <label htmlFor={`qty-${product.id}`} className="text-sm">الكمية:</label>
        <select
          id={`qty-${product.id}`}
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          className="border rounded px-2 py-1"
        >
          {[...Array(1000)].map((_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1}</option>
          ))}
        </select>
      </div>

      <button
  className="bg-green-900 text-white px-4 py-2 rounded hover:bg-green-800"
  onClick={() => {
  addToCart({
    id: product.id,
    qty: quantity,
    cost_price: product.cost_price,
    label: product.label,
    name: product.name,
  });
  alert(`تم إضافة ${quantity} من ${product.label}`);
  }}
>
  🛒 أضف للسلة
</button>
    </div>
  );
}

export default ProductCard;

