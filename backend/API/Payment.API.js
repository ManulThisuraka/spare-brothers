const express = require("express");
const router = express.Router();
const controller = require("../Controllers/Payment.Controller");

module.exports = function () {
  router.post("/payment", controller.makePayment);
  return router;
};
