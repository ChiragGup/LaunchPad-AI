import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userCollection",
    required: true
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userCollection",
    required: true
  },

  cardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ideaCollection",
    required: true
  },

  messagedata: {
    type: String,
    required: true,
    trim: true
  }
}, { timestamps: true });

const messageCollection = mongoose.model(
  "messageCollection",
  messageSchema
);

export default messageCollection;