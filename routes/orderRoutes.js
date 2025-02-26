const express = require("express");
const { createOrder, getUserOrders, deleteOrder } = require("../controller/orderController");

const { authMiddleware } = require("../middleware/auth");
const router = express.Router();

// POST request to place an order
router.post("/orders", authMiddleware, createOrder);
router.get("/orders", authMiddleware, getUserOrders);

router.delete("/orders/delete/:orderId", authMiddleware, deleteOrder); // Delete Order

module.exports = router;
