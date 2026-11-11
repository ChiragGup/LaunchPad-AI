
import mongoose from "mongoose";

const ideaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },

category: {
  type: String,
  required: true,
  enum: [
    "Technology",
    "AI & Technology",
    "Healthcare",
    "Education",
    "Finance",
    "E-commerce",
    "Environment",
    "Other",
  ],
},

    targetAudience: {
      type: String,
      required: true,
      trim: true,
    },

    problemStatement: {
      type: String,
      required: true,
      trim: true,
    },

    proposedSolution: {
      type: String,
      required: true,
      trim: true,
    },

    businessModel: {
      type: String,
      trim: true,
      default: "",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userCollection",
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const ideaCollection = mongoose.model(
  "ideaCollection",
  ideaSchema
);

export default ideaCollection;
