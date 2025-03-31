**Overview**

This project is a scalable event-driven microservice built using Node.js and Apache Kafka for real-time processing of user activity logs.
The processed logs are stored in MongoDB with proper indexing and can be accessed via a REST API with pagination and filtering.

**Features**

Domain-Driven Design (DDD) Architecture
Kafka Producer & Consumer for real-time log processing
MongoDB storage with efficient indexing
REST API for retrieving logs with pagination & filtering
Dockerized for easy deployment

**Prerequisites**
Node.js
Docker
Kafka
MongoDB

**Setup Environment Variables**

MONGO_URI=mongodb+srv://(your mongoDB url)
KAFKA_BROKER=kafka:9092
PORT=8080

**Run the Application (Locally)**

Start Kafka, Zookeeper, and MongoDB using Docker:
docker-compose up -d
npm install
npm start

**REST API Endpoints**
BaseUrl: http://localhost:8080/api/

**Fetch Logs:**

GET /logs
Description: Fetch paginated logs with optional filtering.
Query Parameters:
page (integer, optional): Page number (default: 1)
limit (integer, optional): Number of logs per page (default: 10)
startDate (string, optional): Filter logs created after this date.
endDate (string, optional): Filter logs created before this date.
search (string, optional): Search logs by message content.

**Kafka Producer:**

POST /produce
Description: Send a message to the Kafka topic.
Request Body:
{
  "message": "User action log message"
}

The microservice is available as a pre-built Docker image on Docker Hub. You can pull and run it using:
docker pull thebully/my-kafka-microservice  
docker run -p 8080:8080 thebully/my-kafka-microservice  
