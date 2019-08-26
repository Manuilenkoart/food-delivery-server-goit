const express = require("express");
const products = require("./products");
const users = require("./users");
const orders = require("./orders");

const app = express();

app.use("/products", products);
app.use("/signup", users);
app.use("/orders", orders);

module.exports = app;
