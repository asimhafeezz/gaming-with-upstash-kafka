import { Kafka } from "kafkajs"

// dotenv is used to load environment variables from a .env file into process.env
import dotenv from "dotenv"
dotenv.config()

// create a new Kafka instance and export it
export const kafka = new Kafka({
	brokers: [process.env.UPSTASH_KAFKA_BROKER_URL],
	sasl: {
		mechanism: "scram-sha-256",
		username: process.env.UPSTASH_KAFKA_USERNAME,
		password: process.env.UPSTASH_KAFKA_PASSWORD,
	},
	ssl: true,
	// dont log anything
	logLevel: 0,
})
