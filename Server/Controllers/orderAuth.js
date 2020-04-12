const jwt = require("jsonwebtoken");
require("dotenv").config();
const Order = require("../Models/order");

exports.placeOrder = async (req, res) => {
  const order = await new Order(req.body);
  await order.save();
  res.status(200).json({
    msg: "Order placed sucessfully!"
  });
};

exports.getOrder = (req, res) => {
  Order.find((err, order) => {
    if (err) {
      return res.status(401).json({
        error: "Error Fetching Orders"
      });
    }
    console.log(order);
    return res.json(order);
  });
};
