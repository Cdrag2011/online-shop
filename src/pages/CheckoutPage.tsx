import React, { useState } from "react";
import { Link } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useCart } from "../context/CartContext";
import Section from "../components/Section";
import jsPDF from "jspdf";

// ⭐ INPUT STYLING — VARIANTA 1 (ALB + NEGRU)
const inputStyle =
  "checkout-input w-full p-3 rounded-xl bg-white text-black placeholder-gray-500 border border-gray-300 focus:border-black focus:ring-2 focus:ring-black transition";

// ---------------------------------------------------
interface CheckoutCartItem {
  product: { id: string; name: string; price: number };
  quantity: number;
}

interface OrderData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  county: string;
  city: string;
  street: string;
  postalCode: string;
  deliveryMethod: "curier" | "ridicare";
  paymentMethod: "ramburs" | "transfer";
  wantInvoice: boolean;
  companyName?: string;
  cui?: string;
  regCom?: string;
  companyAddress?: string;
  cart: CheckoutCartItem[];
  total: number;
  createdAt: any;
  status: "noua";
}
// ---------------------------------------------------

const CheckoutPage: React.FC = () => {
  const { cart, total, clearCart } = useCart();

  const [openSection, setOpenSection] = useState<
    "client" | "delivery" | "invoice" | "summary"
  >("client");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [county, setCounty] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const [deliveryMethod, setDeliveryMethod] =
    useState<"curier" | "ridicare">("curier");
  const [paymentMethod, setPaymentMethod] =
    useState<"ramburs" | "transfer">("ramburs");

  const [wantInvoice, setWantInvoice] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [cui, setCui] = useState("");
  const [regCom, setRegCom] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [successOrderId, setSuccessOrderId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // ------------------------
  // PDF generare
  // ------------------------
  const generateInvoicePdfBase64 = (order: OrderData, orderId: string) => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Factura fiscala", 20, 20);

    doc.setFontSize(12);
    doc.text(`Comanda #${orderId}`, 20, 30);
    doc.text(`Data: ${new Date().toLocaleString("ro-RO")}`, 20, 38);

    doc.text("Client:", 20, 50);
    doc.text(`${order.firstName} ${order.lastName}`, 20, 56);
    doc.text(order.email, 20, 62);
    doc.text(order.phone, 20, 68);
    doc.text(
      `${order.street}, ${order.city}, ${order.county} ${order.postalCode}`,
      20,
      74
    );

    if (order.wantInvoice) {
      doc.text("Date firma:", 20, 88);
      doc.text(order.companyName || "", 20, 94);
      if (order.cui) doc.text(`CUI: ${order.cui}`, 20, 100);
      if (order.regCom) doc.text(`Reg. Com.: ${order.regCom}`, 20, 106);
      if (order.companyAddress) doc.text(order.companyAddress, 20, 112);
    }

    let y = 130;
    doc.text("Produse:", 20, y);
    y += 8;

    order.cart.forEach((item) => {
      doc.text(
        `${item.product.name} x ${item.quantity} = ${
          item.product.price * item.quantity
        } lei`,
        20,
        y
      );
      y += 6;
    });

    y += 8;
    doc.text(`TOTAL: ${order.total} lei`, 20, y);

    return doc.output("datauristring");
  };

  // VALIDARE
  const validateForm = (): string | null => {
    if (!firstName || !lastName) return "Completează numele.";
    if (!phone) return "Completează telefonul.";
    if (!email) return "Completează emailul.";
    if (!county || !city || !street) return "Completează adresa.";

    if (wantInvoice) {
      if (!companyName) return "Completează denumirea firmei.";
      if (!cui) return "Completează CUI-ul.";
    }

    return null;
  };

  // TRIMITERE COMANDĂ
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const validation = validateForm();
    if (validation) {
      setErrorMsg(validation);
      return;
    }

    setSubmitting(true);

    try {
      const order: OrderData = {
        firstName,
        lastName,
        email,
        phone,
        county,
        city,
        street,
        postalCode,
        deliveryMethod,
        paymentMethod,
        wantInvoice,
        companyName: wantInvoice ? companyName : undefined,
        cui: wantInvoice ? cui : undefined,
        regCom: wantInvoice ? regCom : undefined,
        companyAddress: wantInvoice ? companyAddress : undefined,
        cart: cart.map((item) => ({
          product: {
            id: item.product.id,
            name: item.product.name,
            price: item.product.price,
          },
          quantity: item.quantity,
        })),
        total,
        createdAt: serverTimestamp(),
        status: "noua",
      };

      // 1) Salvăm în Firestore
      const ref = await addDoc(collection(db, "orders"), order);
      const orderId = ref.id;

      // 2) Generăm factura PDF (base64)
      const invoicePdf = generateInvoicePdfBase64(order, orderId);

      // 3) Trimitem email + SMS (prin PHP)
      const response = await fetch("https://baiadeulei.ro/api/send-order.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...order,
          orderId,
          invoicePdf,
        }),
      });

      let result: any = null;
      try {
        result = await response.json();
      } catch {
        throw new Error("Răspuns invalid de la server (nu este JSON).");
      }

      if (!response.ok || !result?.success) {
        throw new Error(result?.message || "Eroare la trimiterea emailului.");
      }

      // 4) Deschidem WhatsApp cu mesaj de confirmare (către tine / admin)
      const adminPhone = "40723730664"; // 👉 pune aici numărul tău (fără +)
      const waMessage =
        `Comandă nouă #${orderId}\n` +
        `Client: ${firstName} ${lastName}\n` +
        `Telefon: ${phone}\n` +
        `Email: ${email}\n` +
        `Total: ${total} lei\n\n` +
        order.cart
          .map(
            (item) =>
              `• ${item.product.name} x ${item.quantity} = ${
                item.product.price * item.quantity
              } lei`
          )
          .join("\n");

      window.open(
        `https://wa.me/${adminPhone}?text=${encodeURIComponent(waMessage)}`,
        "_blank"
      );

      clearCart();
      setSuccessOrderId(orderId);
      setOpenSection("summary");
    } catch (err: any) {
      console.error(err);
      setErrorMsg(
        err?.message || "A apărut o eroare la trimiterea comenzii."
      );
    }

    setSubmitting(false);
  };

  // Coș gol
  if (!cart.length && !successOrderId) {
    return (
      <div className="pt-32 text-center text-white">
        <h1 className="text-3xl font-bold mb-4">Coșul este gol</h1>
        <Link
          to="/produse"
          className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold"
        >
          Înapoi la produse
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-16 px-4 max-w-5xl mx-auto text-white">
      <h1 className="text-4xl font-bold mb-4">Finalizează comanda</h1>

      {errorMsg && (
        <div className="mb-4 bg-red-600/80 px-4 py-3 rounded-xl text-sm">
          {errorMsg}
        </div>
      )}

      {successOrderId ? (
        <div className="bg-green-700/30 border border-green-500 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-3 text-green-300">
            Comanda a fost trimisă!
          </h2>
          <p className="mb-4">
            Număr comandă:{" "}
            <span className="font-mono text-yellow-300">{successOrderId}</span>
          </p>
          <Link
            to="/produse"
            className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold"
          >
            Continuă cumpărăturile
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* 1. Date client */}
          <Section
            id="client"
            title="1. Date client"
            openSection={openSection}
            setOpenSection={setOpenSection}
          >
            <div className="grid md:grid-cols-2 gap-4">
              <input
                className={inputStyle}
                placeholder="Prenume *"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                className={inputStyle}
                placeholder="Nume *"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <input
                className={inputStyle}
                placeholder="Telefon *"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                className={inputStyle}
                placeholder="Email *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className={inputStyle}
                placeholder="Județ *"
                value={county}
                onChange={(e) => setCounty(e.target.value)}
              />
              <input
                className={inputStyle}
                placeholder="Oraș *"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <input
                className={`${inputStyle} md:col-span-2`}
                placeholder="Adresă completă *"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
              <input
                className={inputStyle}
                placeholder="Cod poștal"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
          </Section>

          {/* 2. Livrare & Plată */}
          <Section
            id="delivery"
            title="2. Livrare & Plată"
            openSection={openSection}
            setOpenSection={setOpenSection}
          >
            <p className="font-semibold mb-2">Metodă livrare</p>
            <label className="radio">
              <input
                type="radio"
                checked={deliveryMethod === "curier"}
                onChange={() => setDeliveryMethod("curier")}
              />
              Curier rapid
            </label>

            <label className="radio mb-4">
              <input
                type="radio"
                checked={deliveryMethod === "ridicare"}
                onChange={() => setDeliveryMethod("ridicare")}
              />
              Ridicare personală — Baia Mare
            </label>

            <p className="font-semibold mb-2">Metodă plată</p>
            <label className="radio">
              <input
                type="radio"
                checked={paymentMethod === "ramburs"}
                onChange={() => setPaymentMethod("ramburs")}
              />
              Ramburs la livrare
            </label>
            <label className="radio">
              <input
                type="radio"
                checked={paymentMethod === "transfer"}
                onChange={() => setPaymentMethod("transfer")}
              />
              Transfer bancar
            </label>
          </Section>

          {/* 3. Facturare */}
          <Section
            id="invoice"
            title="3. Facturare"
            openSection={openSection}
            setOpenSection={setOpenSection}
          >
            <label className="flex items-center gap-3 mb-4">
              <input
                type="checkbox"
                checked={wantInvoice}
                onChange={(e) => setWantInvoice(e.target.checked)}
              />
              Vreau factură pe firmă
            </label>

            {wantInvoice && (
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  className={`${inputStyle} md:col-span-2`}
                  placeholder="Denumire firmă *"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
                <input
                  className={inputStyle}
                  placeholder="CUI *"
                  value={cui}
                  onChange={(e) => setCui(e.target.value)}
                />
                <input
                  className={inputStyle}
                  placeholder="Reg. Com."
                  value={regCom}
                  onChange={(e) => setRegCom(e.target.value)}
                />
                <input
                  className={`${inputStyle} md:col-span-2`}
                  placeholder="Adresă firmă"
                  value={companyAddress}
                  onChange={(e) => setCompanyAddress(e.target.value)}
                />
              </div>
            )}
          </Section>

          {/* 4. Rezumat */}
          <Section
            id="summary"
            title="4. Rezumat & Finalizare"
            openSection={openSection}
            setOpenSection={setOpenSection}
          >
            <div className="space-y-2 mb-4">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex justify-between border-b border-white/10 pb-1 text-sm"
                >
                  <span>
                    {item.product.name} x {item.quantity}
                  </span>
                  <span>{item.product.price * item.quantity} lei</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between mb-4 text-lg">
              <span>Total:</span>
              <span className="text-2xl font-bold text-yellow-400">
                {total} lei
              </span>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-3 rounded-xl font-bold disabled:opacity-60"
            >
              {submitting ? "Se trimite comanda..." : "Trimite comanda"}
            </button>

            <div className="mt-4 text-center">
              <Link
                to="/cart"
                className="text-gray-400 hover:text-yellow-300 underline"
              >
                ← Înapoi la coș
              </Link>
            </div>
          </Section>
        </form>
      )}
    </div>
  );
};

export default CheckoutPage;
