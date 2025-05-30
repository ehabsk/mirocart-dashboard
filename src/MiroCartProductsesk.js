
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import SelectSalesRep from "./SelectSalesRep";
import SelectCustomer from "./SelectCustomer";

const MiroCartProducts = ({ cart, setCart, addToCart }) => {
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [selectedFactory, setSelectedFactory] = useState("");
  const [selectedStrength, setSelectedStrength] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    fetch("http://localhost:8088/api/index.php/products", {
      headers: {
        "DOLAPIKEY": "M0L6lO8Dqh68jRGivY7cCt5To6MrjK41",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setOriginalProducts(data);
        setProducts(data);
      })
      .catch((error) => console.error("خطأ في تحميل المنتجات:", error));
  }, []);

  const parseLabel = (label) => {
    const parts = label.split("|").map(p => p.trim());
    return {
      name: parts[0] || "",
      size: parts[1] || "",
      strength: parts[2] || "",
      factory: parts[3] || ""
    };
  };

  useEffect(() => {
    let filtered = [...originalProducts];
    if (selectedFactory) {
      filtered = filtered.filter(p => parseLabel(p.label).factory === selectedFactory);
    }
    if (selectedStrength) {
      filtered = filtered.filter(p => parseLabel(p.label).strength === selectedStrength);
    }
    if (selectedSize) {
      filtered = filtered.filter(p => parseLabel(p.label).size === selectedSize);
    }
    setProducts(filtered);
  }, [selectedFactory, selectedStrength, selectedSize, originalProducts]);

  const factories = [...new Set(originalProducts.map(p => parseLabel(p.label).factory).filter(Boolean))];
  const strengths = [...new Set(originalProducts.map(p => parseLabel(p.label).strength).filter(Boolean))];
  const sizes = [...new Set(originalProducts.map(p => parseLabel(p.label).size).filter(Boolean))];

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-4">
        <select value={selectedFactory} onChange={(e) => setSelectedFactory(e.target.value)} className="border px-2 py-1 rounded">
          <option value="">🏭 كل المصانع</option>
          {factories.map((f, i) => <option key={i} value={f}>{f}</option>)}
        </select>
        <select value={selectedStrength} onChange={(e) => setSelectedStrength(e.target.value)} className="border px-2 py-1 rounded">
          <option value="">🧪 كل التركيزات</option>
          {strengths.map((s, i) => <option key={i} value={s}>{s}</option>)}
        </select>
        <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)} className="border px-2 py-1 rounded">
          <option value="">📦 كل الأحجام</option>
          {sizes.map((s, i) => <option key={i} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

export default MiroCartProducts;
