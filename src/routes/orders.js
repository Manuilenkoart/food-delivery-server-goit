const express = require("express");

const app = express();
const ordersService = require("../services/orders-service");

app.post("/", async (req, res) => {
  const order = await ordersService.create(req.body);

  for (el of order.products) {
    if (el == undefined) {
      res.json({ status: "failed", order: null });
    }
  }

  res.json({ status: "success", order: order });
});

module.exports = app;
