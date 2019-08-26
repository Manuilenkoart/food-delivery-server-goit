const express = require("express");

const app = express();
const productService = require("../services/product-service");

app.get("/:id", async (request, response) => {
  const product = await productService.getOne(request.params.id);

  if (!product) {
    return res.status(404).json({
      status: "Not Found"
    });
  }
  response.json({ status: "success", products: product });
});

app.get("/", async (req, res) => {
  console.log(req.query);

  if (req.query.ids) {
    const queryProduct = await productService.getQuery(req.query.ids);
    if (queryProduct.length === 0) {
      return res.status(404).json({
        status: "no products",
        product: queryProduct
      });
    }

    res.json({ status: "success", products: queryProduct });
  }

  if (req.query.category) {
    const queryCategory = await productService.getQueryCategory(
      req.query.category
    );
    if (queryCategory.length === 0) {
      return res.status(404).json({
        status: "no products",
        product: queryCategory
      });
    }
    res.json({ status: "success", products: queryCategory });
  }

  const products = await productService.getAll();
  res.json({ status: "success", products: products });
});

app.post("/", (request, response) => {
  response.status(201).json({ ok: "create data" });
});

module.exports = app;
