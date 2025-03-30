import kafka from "./kafka.js";
import Log from "../../../domain/models/log.model.js";

class Consumer {
  constructor() {
    this.consumer = kafka.consumer({ groupId: "user" });
    this.isConnected = false;
  }

  async connect() {
    if (!this.isConnected) {
      await this.consumer.connect();
      this.isConnected = true;
      console.log("Kafka Consumer Connected");
    }
  }

  async consumeMessages(topic) {
    await this.connect();
    await this.consumer.subscribe({ topic, fromBeginning: true });

    await this.consumer.run({
      eachMessage: async ({ message }) => {
        const value = message.value.toString();
        console.log(`Received message: ${value}`);

        try {
          await Log.create({ message: value });
          console.log("Log stored in MongoDB");
        } catch (error) {
          console.error("Error saving log to MongoDB:", error);
        }
      },
    });
  }

  async disconnect() {
    if (this.isConnected) {
      await this.consumer.disconnect();
      console.log("Kafka Consumer Disconnected");
    }
  }
}

export default new Consumer();
