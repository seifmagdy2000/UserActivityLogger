import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "nodejs-kafka",
  brokers: ["localhost:9092"],
});

export default kafka;
