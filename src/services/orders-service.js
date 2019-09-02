const fs = require("fs");
const utils = require("util");
const productService = require("../services/product-service");

const readFile = utils.promisify(fs.readFile);
const writeFile = utils.promisify(fs.writeFile);
const path = require("path");

const dbPath = path.resolve(__dirname, "../", "db/orders.json");
module.exports = {
  async create(order) {
    let orders = await readFile(dbPath);
    orders = JSON.parse(orders);

    // console.log(order);

    order.id = orders[orders.length - 1].id + 1;

    const arryOfProducts = [];
    for (el of order.products) {
      let oneProduct = await productService.getOne(el);
      console.log(oneProduct);
      // if (oneProduct == undefined) {
      //   oneProduct = { status: "failed", order: null };
      // } проверка наличия заказа
      arryOfProducts.push(oneProduct);
    }
    order.products = arryOfProducts;
    orders.push(order);
    await writeFile(dbPath, JSON.stringify(orders));
    return order;
  }
};
