const Order = require("../model/orderModel");

exports.createOrder = async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ error: "Unauthorized. Please log in." });
    }

    const { selectedItems, selectedDate, selectedTimeSlot, address } = req.body;

    // Validate required fields
    if (!selectedItems || !selectedDate || !selectedTimeSlot || !address) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Parse selectedItems if it's a string
    let itemsArray = typeof selectedItems === "string" ? JSON.parse(selectedItems) : selectedItems;

    // Ensure selectedItems is an array
    if (!Array.isArray(itemsArray)) {
      return res.status(400).json({ error: "Invalid items format." });
    }

    // Filter out items with zero quantity
    const validItems = itemsArray.filter(item => item.quantity > 0);

    if (validItems.length === 0) {
      return res.status(400).json({ error: "No valid items selected." });
    }

    // Calculate total amount
    const totalAmount = validItems.reduce((acc, item) => {
      if (!item.cost || !item.quantity || isNaN(item.cost) || isNaN(item.quantity)) {
        console.error("Invalid item data:", item);
        return acc;
      }
      return acc + (item.cost * item.quantity);
    }, 0);

    // Validate totalAmount
    if (isNaN(totalAmount) || totalAmount <= 0) {
      return res.status(400).json({ error: "Invalid total amount calculation." });
    }

    // Create new order
    const newOrder = new Order({
      userId: req.user.userId,   // Ensure order is linked to user
      selectedItems: validItems, // Store only valid items
      totalAmount,
      totalItems: validItems.length,
      selectedDate,
      selectedTimeSlot,
      address,
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", order: newOrder });

  } catch (error) {
    console.error("Order Creation Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



exports.getUserOrders = async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ error: "Unauthorized. Please log in." });
    }

    const orders = await Order.find({ userId: req.user.userId }).sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found." });
    }

    // Convert Mongoose documents to plain objects before modifying
    const modifiedOrders = orders.map(order => ({
      ...order.toObject(),
      status: order.status || "Ordered", // Ensure default value
      deliveryDate: order.deliveryDate || new Date(order.createdAt.getTime() + 5 * 24 * 60 * 60 * 1000), // Ensure 5-day addition
    }));

    res.status(200).json({ orders: modifiedOrders });

  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.deleteOrder = async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ error: "Unauthorized. Please log in." });
    }

    const { orderId } = req.params;

    if (!orderId) {
      return res.status(400).json({ error: "Order ID is required." });
    }

    const order = await Order.findOne({ _id: orderId, userId: req.user.userId });

    if (!order) {
      return res.status(404).json({ error: "Order not found or unauthorized access." });
    }

    await Order.findByIdAndDelete(orderId);

    res.status(200).json({ message: "Order deleted successfully." });

  } catch (error) {
    console.error("Order Deletion Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
