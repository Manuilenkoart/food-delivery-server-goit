const fs = require("fs");
const utils = require("util");

const readFile = utils.promisify(fs.readFile);
const writeFile = utils.promisify(fs.writeFile);
const path = require("path");

const dbPathProducts = path.resolve(__dirname, "..", "db/products.json");

module.exports = {
  async getOne(id) {
    let product = await readFile(dbPathProducts);
    product = JSON.parse(product);
    for (const el of product) {
      if (el.id == id) {
        return el;
      }
    }
  },
  async getQuery(ids) {
    const arrySearchProducts = [];

    let product = await readFile(dbPathProducts);
    product = JSON.parse(product);

    const arryIds = ids.split(",");

    for (const elOfArryIds of arryIds) {
      for (const elOfProduct of product) {
        if (elOfProduct.id == elOfArryIds) {
          arrySearchProducts.push(elOfProduct);
        }
      }
    }
    return arrySearchProducts;
  },
  async getQueryCategory(category) {
    const arryProducts = [];
    let product = await readFile(dbPathProducts);
    product = JSON.parse(product);
    for (const el of product) {
      if (el.categories.includes(category)) {
        arryProducts.push(el);
      }
    }
    return arryProducts;
  },
  async getAll() {
    let products = await readFile(dbPathProducts);
    products = JSON.parse(products);
    return products;
  },

  create(product) {
    return { ...product, id: "1" };
  }
};
