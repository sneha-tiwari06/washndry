const express = require("express");
const { createOrder, getUserOrders } = require("../controller/orderController");

const { authMiddleware } = require("../middleware/auth");
const router = express.Router();

// POST request to place an order
router.post("/orders", authMiddleware, createOrder);


module.exports = router;
