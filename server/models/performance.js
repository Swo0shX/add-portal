import mongoose from "mongoose";
import { bigint, number } from "zod";

const performanceDetailsSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  userId: {
    // type: mongoose.Schema.Types.ObjectId,
    type: String,
    // ref: "User",
    required: false,
  },
  requestType: { type: String },
  requestNo: { type: String },
  description: { type: String },
  dateReceived: { type: Date },
  targetEndDate: { type: Date },
  dateCompleted: { type: Date },
  pauseTime: { type: Number },
  requestStatus: { type: String },
  kra: { type: String },
  remarks: { type: String, default: "" },
  rating: { type: Number, default: 0 },
});

const PerformanceDetails =
  mongoose.models.PerformanceDetails ||
  mongoose.model("PerformanceDetails", performanceDetailsSchema);

export default PerformanceDetails;
