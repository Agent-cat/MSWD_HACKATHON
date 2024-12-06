const mongoose = require("mongoose");

const elementSchema = new mongoose.Schema({
  id: String,
  type: String,
  content: String,
  x: Number,
  y: Number,
  width: Number,
  height: Number,
  styles: mongoose.Schema.Types.Mixed,
  locked: Boolean,
  hidden: Boolean,
  src: String,
  placeholder: String,
});

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    elements: [elementSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lastModified: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
