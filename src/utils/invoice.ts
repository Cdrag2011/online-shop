// src/utils/invoice.ts
import jsPDF from "jspdf";
import type { Order } from "../types/order";

export function generateInvoice(order: Order) {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Factura", 20, 20);

  doc.setFontSize(10);
  doc.text(`Număr comandă: ${order.id}`, 20, 30);
  doc.text(`Data: ${new Date(order.createdAt).toLocaleString()}`, 20, 36);

  doc.text(
    `Client: ${order.billing.nume} ${order.billing.prenume}`,
    20,
    46
  );
  doc.text(`Email: ${order.billing.email}`, 20, 52);
  doc.text(`Telefon: ${order.billing.telefon}`, 20, 58);

  if (order.billing.tip === "firma") {
    doc.text(`Firmă: ${order.billing.firma ?? ""}`, 20, 68);
    doc.text(`CUI: ${order.billing.cui ?? ""}`, 20, 74);
    if (order.billing.codFiscal) {
      doc.text(`Cod fiscal: ${order.billing.codFiscal}`, 20, 80);
    }
  }

  let y = 90;
  doc.text("Produse:", 20, y);
  y += 6;

  order.items.forEach((item) => {
    doc.text(
      `${item.name} x ${item.quantity} - ${item.price * item.quantity} lei`,
      20,
      y
    );
    y += 6;
  });

  y += 4;
  doc.text(
    `Total: ${order.total.toFixed(2)} lei`,
    20,
    y
  );

  doc.save(`factura-${order.id}.pdf`);
}
