import cors from "cors";
import { Kafka } from "kafkajs";
import router from "./routes";

const express = require("express");
const dotenv = require("dotenv");

const kafka = new Kafka({
  clientId: "user-service",
  brokers: ["localhost:9093"],
  retry: {
    retries: 10,
    initialRetryTime: 300,
    maxRetryTime: 30000, // Increase max retry time to allow for longer elections
  },
});


const consumer = kafka.consumer({ groupId: 'service-group' });

const run = async () => {
  try {
    await consumer.connect();
    await consumer.subscribe({ topic: 'topic-service1', fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          value: message.value ? message.value.toString() : null,
        });
      },
    });
  } catch (error) {
    console.error('Error running consumer:', error);
    setTimeout(run, 5000); // Retry after 5 seconds if error occurs
  }
};

run();



dotenv.config();

const app = express();

app.use(express.json()); 
app.use('/api', router);
app.use(cors())

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
