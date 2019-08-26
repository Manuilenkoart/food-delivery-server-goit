const uuid = require("uuid/v4");

const fs = require("fs");
const utils = require("util");

const readFile = utils.promisify(fs.readFile);
const writeFile = utils.promisify(fs.writeFile);
const path = require("path");

const dbPath = path.resolve(__dirname, "../", "db/orders.json");
module.exports = {
  async create(order) {
    let orders = await readFile(dbPath);
    orders = JSON.parse(orders);

    const getOrder = { ...order };
    getOrder.id = uuid();
    orders.push(getOrder);

    await writeFile(dbPath, JSON.stringify(orders));
    return getOrder;
  }
};
