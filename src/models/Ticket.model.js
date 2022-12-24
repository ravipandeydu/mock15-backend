const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    category: { type: String, require: true },
    title: { type: String, require: true },
    message: { type: String, require: true },
  },
  { timestamps: true }
);

const TicketModel = mongoose.model("ticket", ticketSchema);

module.exports = {
  TicketModel,
};
