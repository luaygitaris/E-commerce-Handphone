const express = require("express");
const cors = require("cors");
const axios = require("axios")
const midtransClient = require("midtrans-client")
const { config } = require('dotenv');
config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/send-to-zapier", async (req, res) => {
  try {
    const zapierURL = "https://hooks.zapier.com/hooks/catch/23777579/u22ddcp/";
    const result = await axios.post(zapierURL, req.body);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
});

// ✅ Gunakan env untuk Midtrans server key
const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY, // ✅ Lebih aman
});

app.post("/create-transaction", async (req, res) => {
  const { customer, items, total } = req.body;
  console.log("Diterima di backend:", { customer, items, total });

  const orderId = "ORDER-" + Date.now();

  const parameters = {
    transaction_details: {
      order_id: orderId,
      gross_amount: total,
    },
    customer_details: {
      first_name: customer.name,
      email: customer.email,
      phone: customer.phone,
      billing_address: {
        address: customer.address,
        postal_code: customer.postalCode,
      },
    },
    item_details: items.map((item) => ({
      id: item.id || item.name,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    })),
  };

  try {
    const transaction = await snap.createTransaction(parameters);
    console.log("Snap token (sandbox):", transaction.token);
    res.json({ token: transaction.token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create transaction" });
  }
});

app.get('/', (req, res) => {
  res.send('API Working');
});

module.exports = app;

if (process.env.VERCEL !== '1') {
  app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
  });
}
