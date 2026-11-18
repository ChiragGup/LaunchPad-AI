
import mongoose from "mongoose";
import userCollection from "./user.js";
import ideaCollection from "./createUser.js";

const commentSchema = new mongoose.Schema({
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

  comments: {
    type: String,
    required: true,
    trim: true
  }

}, { timestamps: true });

const commentCollection = mongoose.model(
  "commentCollection",
  commentSchema
);

export default commentCollection;
