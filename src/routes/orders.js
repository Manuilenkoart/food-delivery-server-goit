const express = require("express");

const app = express();
const ordersService = require("../services/orders-service");

app.post("/", async (req, res) => {
  const order = await ordersService.create(req.body);
  res.json({ status: "success", order: order });
});

module.exports = app;
