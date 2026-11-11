import mongoose from "mongoose";

const passwordResetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userCollection",
    required: true,
  },

  tokenHash: {
    type: String,
    required: true,
  },

  expiresAt: {
    type: Date,
    required: true,
  },

  used: {
    type: Boolean,
    default: false,
  },
});

const passwordReset = mongoose.model(
  "passwordReset",
  passwordResetSchema
);

export default passwordReset;