const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    selectedItems: [
      {
        name: String,
        cost: Number,
        snapshot: String,
        quantity: Number,
      }
    ],
    totalAmount: {
      type: Number,
      required: true,
      default: 0,
    },
    totalItems: {
      type: Number,
      required: true,
      default: 0,
    },
    selectedDate: {
      type: String,
      required: true,
    },
    selectedTimeSlot: {
      type: String,
      required: true,
    },
    address: {
      firstname: { type: String, required: true },
      lastname: { type: String, required: true },
      emailId: { type: String, required: true },
      fullAddress: { type: String, required: true },
      pincode: { type: Number, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
    },
    status: {
      type: String,
      default: "Ordered",
      enum: ["Ordered", "Shipped", "Delivered", "Cancelled"],
      immutable: true,
    },
    deliveryDate: {
      type: Date,
      default: () => new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      immutable: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
