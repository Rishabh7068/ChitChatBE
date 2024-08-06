import Conversation from "../models/conversation.model.js";
import Msg from "../models/msg.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverID } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, receiverID],
      },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverID],
      });
    }

    const newMsg = new Msg({
      message,
      senderId,
      receiverID,
    });

    if (newMsg) {
      conversation.message.push(newMsg._id);
    }

    // socket io funchtionality

    await Promise.all([conversation.save(), newMsg.save()]);

    res.status(201).json(newMsg);
  } catch (error) {
    console.log("Error in sendMessage Controller", error.message);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("message");

    if (!conversation) {
      return res.status(200).json([]);
    }
    const message = conversation.message;
    res.status(200).json(message);
  } catch (error) {
    console.log("Error in getMessage Controller", error.messages);
    return res.status(500).json({ error: "Internal Server error" });
  }
};
