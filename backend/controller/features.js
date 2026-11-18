
import commentCollection from "../models/comments.js";
import ideaCollection from "../models/createUser.js";
import likeCollection from "../models/like.js";

export const postComments = async (req, res) => {
  try {
    const { comments, cardId } = req.body;
    const id = req.user.id;

    if (!comments?.trim() || !cardId) {
      return res.status(400).json({
        success: false,
        message: "Comment and cardId are required",
      });
    }

    const data = await commentCollection.create({
      userId: id,
      cardId: cardId,
      comments: comments.trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Comment created successfully",
      data,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Comment could not be created successfully",
    });
  }
};


export const fetchComments = async (req, res) => {
  try {
    const data = await commentCollection
      .find()
      .populate("userId", "fullName");

    return res.status(200).json({
      success: true,
      message: "Comments fetched successfully",
      data,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Comments could not be fetched successfully",
    });
  }
};

export const postLike = async (req, res) => {
  try {
    const { cardId, like } = req.body;
    const id = req.user.id;

    const likesData = await likeCollection.findOne({
      userId: id,
      cardId: cardId,
    });

    if (likesData) {
      await likeCollection.findOneAndUpdate(
        {
          userId: id,
          cardId: cardId,
        },
        {
          likes: like,
        }
      );

      if (likesData.likes !== like) {
        await ideaCollection.findByIdAndUpdate(
          { _id: cardId },
          {
            $inc: {
              totalLikes: like ? 1 : -1,
            },
          }
        );
      }

    } else {
      const data = await likeCollection.create({
        userId: id,
        cardId: cardId,
        likes: like,
      });

      if (like === true) {
        await ideaCollection.findByIdAndUpdate(
          { _id: cardId },
          {
            $inc: {
              totalLikes: 1,
            },
          }
        );
      }
    }

    return res.status(200).json({
      success: true,
      message: "Like updated successfully",
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Like could not be updated",
    });
  }
};

export const getLikes = async (req, res) => {
  try {
    const id = req.user.id;

    const data = await likeCollection.find({
      userId: id,
    });

    return res.status(200).json({
      success: true,
      data,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Could not fetch likes",
    });
  }
};