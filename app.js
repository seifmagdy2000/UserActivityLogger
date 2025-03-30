import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/infrastructure/config/mongoDB.config.js";
import consumer from "./src/infrastructure/kafka/consumer.js";
import logRoutes from "./src/routes/log.routes.js";
import producerRoutes from "./src/routes/producer.routes.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
const KAFKA_TOPIC = "user-loges";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

consumer.consumeMessages(KAFKA_TOPIC);

app.use("/api/logs", logRoutes);
app.use("/api/produce", producerRoutes);

app.get("/", (req, res) => {
  res.send("Kafka Service is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
