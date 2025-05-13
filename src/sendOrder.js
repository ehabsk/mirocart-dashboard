
import axios from "axios";
const API_URL = "/api/orders?DOLAPIKEY=s2QFgR71ia3i07cbgmBU9ZD7YbM3WeU5";

const DOLAPIKEY = "s2QFgR71ia3i07cbgmBU9ZD7YbM3WeU5";
      Accept: "application/json"

export async function sendOrder(cart, setCart, customerId, salesRepId, resetFilters) {
  try {
    const orderData = {
      socid: parseInt(customerId),
      date: Math.floor(Date.now() / 1000),
      user_author_id: parseInt(salesRepId),
      lines: cart.map((item) => ({
        fk_product: item.id,
        qty: item.qty,
        subprice: parseFloat(item.cost_price) || 100,
        tva_tx: 0,
        total_ht: (parseFloat(item.cost_price) || 100) * item.qty,
        total_tva: 0,
        total_ttc: (parseFloat(item.cost_price) || 100) * item.qty,
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
      }))
    };

    console.log("🔍 Sending cart items:", cart);
    console.log("🛒 محتويات الكارت قبل الإرسال:", cart);

    const response = await axios.post(API_URL, orderData, {
      headers: {
        "Content-Type": "application/json",
        "DOLAPIKEY": DOLAPIKEY
      }
    });

    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalAmount = cart.reduce((sum, item) => sum + ((parseFloat(item.cost_price) || 0) * item.qty), 0).toFixed(2);

    alert(`✅ الطلب اتسجل برمز: ${response.data.ref}\n📦 الكمية الإجمالية: ${totalQty} وحدة\n💰 المبلغ الكلي: ${totalAmount} جنيه`);

    setCart([]); // تفريغ السلة بعد الإرسال

    if (typeof resetFilters === 'function') {
      resetFilters(); // تصفير الفلاتر
    }

    setTimeout(() => window.location.reload(), 500); // إعادة تحميل الصفحة

    return response.data;
  } catch (error) {
    console.error("❌ فشل في إرسال الطلب:", error);
    alert("❌ حصل خطأ أثناء إرسال الطلب!");
    throw error;
  }
}

export default sendOrder;
