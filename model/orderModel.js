const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Reference to User model
      required: true,
      ref: "User", // Assuming you have a User model
    },
    selectedItems: {
      type: String, // Stored as a stringified JSON for flexibility
      required: true,
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
