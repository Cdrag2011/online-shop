import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Încarcă .env din același folder ca mailer.js
dotenv.config({ path: path.join(__dirname, ".env") });

function required(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Lipsește variabila de mediu: ${name}`);
  return v;
}

const SMTP_HOST = required("SMTP_HOST");
const SMTP_PORT = Number(required("SMTP_PORT"));
const SMTP_SECURE = String(required("SMTP_SECURE")) === "true";
const SMTP_USER = required("SMTP_USER");
const SMTP_PASS = required("SMTP_PASS");
const MAIL_FROM = required("MAIL_FROM");
const MAIL_TO = process.env.MAIL_TO || SMTP_USER;

export const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_SECURE,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
});

export async function sendOrderEmail({ customer, cart, total }) {
  const rows = cart
    .map((item) => {
      const qty = Number(item.quantity ?? item.qty ?? 1);
      const price = Number(item.price ?? 0);
      const lineTotal = qty * price;

      return `<tr>
        <td style="padding:6px 10px;border-bottom:1px solid #eee;">${
          item.name ?? "-"
        }</td>
        <td style="padding:6px 10px;border-bottom:1px solid #eee;text-align:center;">${qty}</td>
        <td style="padding:6px 10px;border-bottom:1px solid #eee;text-align:right;">${price.toFixed(
          2
        )} RON</td>
        <td style="padding:6px 10px;border-bottom:1px solid #eee;text-align:right;">${lineTotal.toFixed(
          2
        )} RON</td>
      </tr>`;
    })
    .join("");

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.5">
      <h2>Comandă nouă - Neo Tech Shop</h2>
      <p><strong>Nume:</strong> ${customer.name}</p>
      <p><strong>Email:</strong> ${customer.email}</p>
      <p><strong>Telefon:</strong> ${customer.phone}</p>

      <h3>Produse</h3>
      <table style="border-collapse:collapse;width:100%;max-width:720px">
        <thead>
          <tr>
            <th style="text-align:left;padding:6px 10px;border-bottom:2px solid #ddd;">Produs</th>
            <th style="text-align:center;padding:6px 10px;border-bottom:2px solid #ddd;">Cant.</th>
            <th style="text-align:right;padding:6px 10px;border-bottom:2px solid #ddd;">Preț</th>
            <th style="text-align:right;padding:6px 10px;border-bottom:2px solid #ddd;">Total</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>

      <h3>Total comandă: ${Number(total).toFixed(2)} RON</h3>
    </div>
  `;

  // Admin
  await transporter.sendMail({
    from: MAIL_FROM,
    to: MAIL_TO || SMTP_USER,
    replyTo: customer.email,
    subject: "🛒 Comandă nouă - Neo Tech Shop",
    html,
  });

  // Client
  await transporter.sendMail({
    from: MAIL_FROM,
    to: customer.email,
    subject: "✅ Confirmare comandă - Neo Tech Shop",
    html: `
    <div style="font-family:Arial,sans-serif;line-height:1.5">
      <h2>Îți mulțumim! Comanda ta a fost înregistrată.</h2>
      <p>Salut, <strong>${customer.name}</strong> — am primit comanda ta.</p>
      <p>Revenim în cel mai scurt timp cu confirmarea și detaliile de livrare.</p>
      <hr/>
      ${html}
    </div>
  `,
  });

  return { adminSentTo: MAIL_TO || SMTP_USER, clientSentTo: customer.email };
}
