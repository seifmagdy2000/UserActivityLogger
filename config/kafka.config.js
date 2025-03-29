import { Kafka } from "kafkajs";

class KafkaConfig {
  constructor() {
    this.kafka = new Kafka({
      clientId: "nodejs-kafka",
      brokers: ["localhost:9092"],
    });
    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId: "test-group" });
  }

  async connectProducer() {
    try {
      await this.producer.connect();
      console.log("Kafka Producer Connected");
    } catch (error) {
      console.error("Kafka Producer Connection Failed:", error);
    }
  }

  async produceMessage(topic, message) {
    try {
      await this.producer.send({
        topic: topic,
        messages: [{ value: message }],
      });
      console.log(`Message sent to ${topic}:`, message);
    } catch (error) {
      console.error("Error Producing Message:", error);
    }
  }

  async consumeMessages(topic, callback) {
    try {
      await this.consumer.connect();
      await this.consumer.subscribe({ topic: topic, fromBeginning: true });
      console.log(`Listening for messages on topic: ${topic}`);

      await this.consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          const value = message.value.toString();
          console.log(`Received message on ${topic}:`, value);
          callback(value);
        },
      });
    } catch (error) {
      console.error("Kafka Consumer Error:", error);
    }
  }
}

export default KafkaConfig;
