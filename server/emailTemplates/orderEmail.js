export const orderEmailTemplate = ({ customer, cart, total }) => {
  const productsHtml = cart
    .map(
      (item) => `
      <tr>
        <td style="padding:8px;border:1px solid #ddd;">${item.name}</td>
        <td style="padding:8px;border:1px solid #ddd;">${item.qty}</td>
        <td style="padding:8px;border:1px solid #ddd;">${item.price} RON</td>
      </tr>
    `
    )
    .join("");

  return `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto">
    <h2 style="color:#facc15">🛒 Comandă nouă – Neo Tech Shop</h2>

    <p><strong>Nume:</strong> ${customer.name}</p>
    <p><strong>Email:</strong> ${customer.email}</p>
    <p><strong>Telefon:</strong> ${customer.phone}</p>

    <h3>Produse comandate</h3>
    <table style="width:100%;border-collapse:collapse">
      <thead>
        <tr>
          <th style="padding:8px;border:1px solid #ddd;">Produs</th>
          <th style="padding:8px;border:1px solid #ddd;">Cantitate</th>
          <th style="padding:8px;border:1px solid #ddd;">Preț</th>
        </tr>
      </thead>
      <tbody>
        ${productsHtml}
      </tbody>
    </table>

    <h2>Total: ${total} RON</h2>

    <p style="margin-top:20px">
      📍 Comandă trimisă automat de pe <strong>baiadeulei.ro</strong>
    </p>
  </div>
  `;
};
