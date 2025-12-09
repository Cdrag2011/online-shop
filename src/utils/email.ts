// src/utils/email.ts
import emailjs from "emailjs-com";
import type { Order } from "../types/order";

const SERVICE_ID = "service_zo13mhk";
const TEMPLATE_ID = "template_afg1wck";
const USER_ID = "0oB8HWmuy0wh7l86X";

export async function sendOrderEmails(order: Order) {
  const templateParams = {
    order_id: order.id,
    total: order.total.toFixed(2),
    client_name: `${order.billing.nume} ${order.billing.prenume}`,
    client_email: order.billing.email,
    client_phone: order.billing.telefon,
    items: order.items
      .map((i) => `${i.name} x ${i.quantity} = ${i.price * i.quantity} lei`)
      .join("\n"),
  };

  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID);
  } catch (e) {
    console.error("Eroare trimitere email:", e);
  }
}
