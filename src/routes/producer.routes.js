import express from "express";
import producer from "../infrastructure/kafka/producer.js";

const router = express.Router();
const KAFKA_TOPIC = "user-loges";

router.post("/", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message is required" });

  try {
    await producer.sendMessage(KAFKA_TOPIC, message);
    res.json({ success: true, message: "Message sent to Kafka" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to send message", details: error.message });
  }
});

export default router;
