import emailjs from "@emailjs/browser";
import type { Order } from "../types/order";

const SERVICE_ID = "service_zo13mhk";   // aici SERVICE ID
const TEMPLATE_ID = "template_afg1wck"; // aici TEMPLATE ID
const PUBLIC_KEY = "0oB8HWmuy0wh7l86X";        // aici PUBLIC KEY

export async function sendOrderEmail(order: Order) {
  const itemsFormatted = order.items
    .map(
      (i) => `• ${i.name} x ${i.quantity} = ${i.price * i.quantity} lei`
    )
    .join("\n");

  const params = {
    order_id: order.id,
    client_name: order.billing.nume + " " + order.billing.prenume,
    client_email: order.billing.email,
    client_phone: order.billing.telefon,
    items: itemsFormatted,
    total: order.total,
    payment_method: order.paymentMethod,
    needs_invoice: order.billing.firma ? "DA" : "NU",
    company_name: order.billing.firma || "",
    cui: order.billing.cui || "",
    address: order.billing.adresa || "",
  };

  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, params, PUBLIC_KEY);
    console.log("Email trimis către client!");
  } catch (err) {
    console.error("Eroare trimitere email:", err);
  }
}
