import { kafka } from "./config.js"

// create a new consumer
const consumer = kafka.consumer({ groupId: "my-gaming-group" })

// consume player state from Upstash Kafka
const consumePlayerState = async () => {
	await consumer.connect()
	await consumer.subscribe({ topic: "players-state", fromBeginning: true })

	// log player state
	await consumer.run({
		eachMessage: async ({ _, __, message }) => {
			console.log({
				playerNewState: JSON.parse(message.value),
			})
		},
	})
}

// consume player state
consumePlayerState().catch(console.error)
