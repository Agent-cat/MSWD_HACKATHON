const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    elements: [
      {
        type: Object,
        required: true,
      },
    ],
    category: {
      type: String,
      required: true,
      enum: ["landing", "portfolio", "blog", "ecommerce", "other"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Template", templateSchema);
