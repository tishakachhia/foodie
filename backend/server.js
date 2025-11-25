const express = require("express");
const cors = require("cors");
const foods = require("./data");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/foods", (req, res) => {
  res.json(foods);
});

app.post("/order", (req, res) => {
  const { cart } = req.body;

  if (!cart || cart.length === 0)
    return res.status(400).json({ message: "Cart is empty" });

  res.json({
    message: "Order received!",
    items: cart,
    total: cart.reduce((sum, item) => sum + item.price, 0)
  });
});

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));
