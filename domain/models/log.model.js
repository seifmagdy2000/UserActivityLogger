import mongoose from "mongoose";

const logSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Log = mongoose.model("Log", logSchema);

export default Log;
