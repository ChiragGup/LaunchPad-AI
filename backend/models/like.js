
import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userCollection",
      required: true,
    },

    cardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ideaCollection",
      required: true,
    },

    likes: {
      type: Boolean,
      default: false,
    },

  },
  {
    timestamps: true,
  }
);

likeSchema.index(
  { userId: 1, cardId: 1 },
  { unique: true }
);

const likeCollection = mongoose.model(
  "likeCollection",
  likeSchema
);

export default likeCollection;
