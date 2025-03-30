import kafka from "./kafka.js";

class Producer {
  constructor() {
    this.producer = kafka.producer({});
    this.isConnected = false;
  }

  async connect() {
    if (!this.isConnected) {
      await this.producer.connect();
      this.isConnected = true;
      console.log("Kafka Producer Connected");
    }
  }

  async sendMessage(topic, message) {
    await this.connect();
    await this.producer.send({
      topic,
      messages: [{ value: message }],
    });
    console.log(`Message sent to ${topic}: ${message}`);
  }

  async disconnect() {
    if (this.isConnected) {
      await this.producer.disconnect();
      console.log("Kafka Producer Disconnected");
    }
  }
}

export default new Producer();
