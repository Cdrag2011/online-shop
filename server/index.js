import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Încarcă .env din acest folder
dotenv.config({ path: path.join(__dirname, ".env") });

console.log("✅ ENV LOADED:", {
  PORT: process.env.PORT,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_SECURE: process.env.SMTP_SECURE,
  SMTP_USER: process.env.SMTP_USER,
  MAIL_FROM: process.env.MAIL_FROM,
  MAIL_TO: process.env.MAIL_TO,
});

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "1mb" }));

app.get("/", (_req, res) => res.json({ status: "API OK" }));

// IMPORTANT: import după dotenv
import { sendOrderEmail } from "./mailer.js";

app.post("/api/order", async (req, res) => {
  try {
    const { customer, cart, total } = req.body;

    if (!customer || typeof customer !== "object") {
      return res.status(400).json({ error: "Customer lipsă" });
    }
    if (!customer.name || !customer.email || !customer.phone) {
      return res.status(400).json({ error: "Customer incomplet" });
    }
    if (!Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ error: "Cart gol" });
    }

    const totalNumber = Number(total);
    if (!Number.isFinite(totalNumber)) {
      return res.status(400).json({ error: "Total invalid" });
    }

    const result = await sendOrderEmail({
      customer,
      cart,
      total: totalNumber,
    });

    return res.json({
      success: true,
      message: "Comanda a fost trimisă cu succes",
      mail: result,
    });
  } catch (err) {
    console.error("❌ ORDER ERROR:", err);
    return res.status(500).json({ error: "Eroare trimitere comandă" });
  }
});

const PORT = Number(process.env.PORT || 4000);

const server = app.listen(PORT, "127.0.0.1", () => {
  console.log(`✅ Server pornit: http://127.0.0.1:${PORT}`);
});

server.on("error", (err) => {
  console.error("❌ LISTEN ERROR:", err);
});

// ca să vedem dacă procesul moare dintr-un motiv ascuns
process.on("uncaughtException", (err) => {
  console.error("❌ UNCAUGHT EXCEPTION:", err);
});
process.on("unhandledRejection", (err) => {
  console.error("❌ UNHANDLED REJECTION:", err);
});
