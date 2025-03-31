import { Kafka } from "kafkajs";
import dotenv from "dotenv";
dotenv.config();

const kafka = new Kafka({
  clientId: "nodejs-kafka",
  brokers: [process.env.KAFKA_BROKER],
});

export default kafka;
