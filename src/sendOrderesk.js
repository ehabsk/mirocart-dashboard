// sendOrder.js
import axios from "axios";

// الرابط الأساسي للـ API الخاص بـ Dolibarr
const API_URL = "http://127.0.0.1:8088/api/index.php/orders";

// مفتاح API الخاص بالمستخدم اللي مفعل في Dolibarr
const DOLAPIKEY = "M0L6lO8Dqh68jRGivY7cCt5To6MrjK41";

export async function sendOrder(cart, setCart, customerId, salesRepId) {
  try {
    const orderData = {
  socid: parseInt(customerId),
  date: Math.floor(Date.now() / 1000),
  user_author_id: parseInt(salesRepId),
  lines: cart.map((item) => {
    console.log("📦 منتج في الكارت:", item);
    return {
      fk_product: item.id,
      qty: item.qty,
      subprice: parseFloat(item.cost_price),
      tva_tx: 0,
      total_ht: (parseFloat(item.cost_price)) * item.qty,
      total_tva: 0,
      total_ttc: (parseFloat(item.cost_price)) * item.qty,
      product_type: 0,
      desc: `${item.id} - ${item.label || item.name || "No description"}`,
      remise_percent: 0,
      info_bits: 0,
      fk_remise_except: null,
      date_start: "",
      date_end: "",
      fk_unit: null,
      rang: 0,
      special_code: 0
    };
  })
};
console.log("🔍 Sending cart items:", cart);
console.log("🛒 محتويات الكارت قبل الإرسال:", cart);

const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
const totalAmount = cart.reduce((sum, item) => sum + ((parseFloat(item.cost_price) || 0) * item.qty), 0).toFixed(2);

const response = await axios.post(API_URL, orderData, {
  headers: {
    "Content-Type": "application/json",
    "DOLAPIKEY": DOLAPIKEY
  }
});

console.log("✅ تم إرسال الطلب بنجاح:", response.data);
alert(`✅ الطلب اتسجل برمز: ${response.data.ref}\n📦 الكمية الإجمالية: ${totalQty} وحدة\n💰 المبلغ الكلي: ${totalAmount} جنيه`);

    setCart([]); // تفريغ السلة بعد الإرسال
    return response.data;
  } catch (error) {
    console.error("❌ فشل في إرسال الطلب:", error);
    alert("❌ حصل خطأ أثناء إرسال الطلب!");
    throw error;
  }
};

export default sendOrder;
