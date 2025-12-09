import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";
import dotenv from "dotenv";

dotenv.config();

const __dirname = process.cwd();
const app = express();

app.use(cors());
app.use(express.json());

// folder facturi
const invoicesDir = path.join(__dirname, "invoices");
if (!fs.existsSync(invoicesDir)) {
  fs.mkdirSync(invoicesDir);
}

// Servire facturi
app.use("/invoices", express.static(invoicesDir));

// Nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Helper: generează factura PDF
function generateInvoicePdf(orderId, order) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(invoicesDir, `invoice-${orderId}.pdf`);
    const doc = new PDFDocument({ margin: 50 });

    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    doc.fontSize(20).text("Factura fiscală", { align: "center" });
    doc.moveDown();

    doc.fontSize(12).text(`Număr factură: ${orderId}`);
    doc.text(`Data: ${new Date().toLocaleString("ro-RO")}`);
    doc.moveDown();

    doc.text(`Client: ${order.name}`);
    doc.text(`Email: ${order.email}`);
    doc.text(`Telefon: ${order.phone}`);
    doc.text(`Adresă: ${order.address}, ${order.city}, ${order.county}`);
    if (order.company) doc.text(`Firmă: ${order.company}`);
    if (order.cui) doc.text(`CUI: ${order.cui}`);
    doc.moveDown();

    doc.text("Produse:", { underline: true });
    order.items.forEach((item) => {
      doc.text(
        `- ${item.name} x ${item.quantity} = ${
          item.price * item.quantity
        } lei`
      );
    });

    doc.moveDown();
    doc.text(`Total produse: ${order.total} lei`);
    doc.text(`Transport: ${order.transportCost} lei`);
    doc.text(`Total de plată: ${order.grandTotal} lei`, {
      bold: true,
    });

    doc.end();

    stream.on("finish", () => resolve(filePath));
    stream.on("error", reject);
  });
}

// Ruta principală de checkout — apelată din frontend
app.post("/checkout", async (req, res) => {
  try {
    const { orderId, order } = req.body;
    if (!orderId || !order) {
      return res.status(400).json({ error: "Lipsesc orderId sau order" });
    }

    // 1. Generăm factura
    const pdfPath = await generateInvoicePdf(orderId, order);

    // 2. Trimitem email la client + admin
    const toClient = order.email;
    const toAdmin = process.env.TO_EMAIL || process.env.SMTP_USER;

    const mailOptions = {
      from: `"Neo Tech Shop" <${process.env.SMTP_USER}>`,
      to: `${toClient}, ${toAdmin}`,
      subject: `Factura comandă #${orderId}`,
      text: `Bună, ${order.name}!\n\nAtașăm factura pentru comanda ta.\n\nTotal: ${order.grandTotal} lei.\n\nMulțumim,\nNeo Tech Shop`,
      attachments: [
        {
          filename: `invoice-${orderId}.pdf`,
          path: pdfPath,
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, invoiceUrl: `/invoices/invoice-${orderId}.pdf` });
  } catch (error) {
    console.error("Eroare la /checkout:", error);
    res.status(500).json({ error: "Eroare la procesarea comenzii" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server backend pornit pe portul ${PORT}`);
});
