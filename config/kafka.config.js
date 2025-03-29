import { Kafka } from "kafkajs";
import Log from "./models/Log.js";

class KafkaConfig {
  constructor() {
    this.kafka = new Kafka({
      clientId: "nodejs-kafka",
      brokers: ["localhost:9092"],
    });

    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId: "log-group" });
    this.isProducerConnected = false;
    this.isConsumerConnected = false;
  }

  async connectProducer() {
    if (!this.isProducerConnected) {
      try {
        await this.producer.connect();
        this.isProducerConnected = true;
        console.log("Producer Connected");
      } catch (error) {
        console.error("Producer Connection Failed:", error);
      }
    }
  }

  async produceMessage(topic, message) {
    try {
      if (!this.isProducerConnected) await this.connectProducer();
      await this.producer.send({
        topic: topic,
        messages: [{ value: message }],
      });
      console.log(`Message sent to ${topic}:`, message);
    } catch (error) {
      console.error("Error Producing Message:", error);
    }
  }

  async consumeMessages(topic) {
    if (!this.isConsumerConnected) {
      try {
        await this.consumer.connect();
        this.isConsumerConnected = true;
        await this.consumer.subscribe({ topic: topic, fromBeginning: true });
        console.log(`Listening for messages on ${topic} :`);

        await this.consumer.run({
          eachMessage: async ({ message }) => {
            const value = message.value.toString();
            console.log(`Received message:`, value);

            try {
              await Log.create({ message: value });
              console.log("Log stored in MongoDB");
            } catch (dbError) {
              console.error("Error saving log to MongoDB:", dbError);
            }
          },
        });
      } catch (error) {
        console.error("Kafka Consumer Error:", error);
      }
    }
  }

  async disconnect() {
    try {
      if (this.isProducerConnected) {
        await this.producer.disconnect();
        console.log("Producer Disconnected");
      }
      if (this.isConsumerConnected) {
        await this.consumer.disconnect();
        console.log("Consumer Disconnected");
      }
    } catch (error) {
      console.error("Error during Kafka disconnect:", error);
    }
  }
}

export default KafkaConfig;
