// taskModel.js
// Schema for the task resource

const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Name field required"],
    },
    startTime: {
      type: Number,
      required: false,
    },
    endTime: {
      type: Number,
      required: false,
    },
    location: {
      type: [Number],
      required: false,
    }
  },
  {
    timestamps: true,
  }
);

taskSchema.index({ name: "text" });

module.exports = mongoose.model("Task", taskSchema);
