import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/infrastructure/config/mongoDB.config.js";
import producer from "./src/infrastructure/kafka/producer.js";
import consumer from "./src/infrastructure/kafka/consumer.js";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;
const KAFKA_TOPIC = "user-loges";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

consumer.consumeMessages(KAFKA_TOPIC);

app.post("/produce", async (req, res) => {
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

app.get("/", (req, res) => {
  res.send("Kafka is running");
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
