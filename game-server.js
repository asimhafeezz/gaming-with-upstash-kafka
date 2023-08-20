import { kafka } from "./config.js"

// create a new producer
const producer = kafka.producer()

// produce player state to Upstash Kafka
const producePlayerState = async () => {
	await producer.connect()

	// player position updates and send to Upstash Kafka
	const playerNewState = {
		playerId: Math.floor(Math.random() * 10) + 1,
		x: Math.random() * 200,
		y: Math.random() * 200,
	}

	// send player state to Upstash Kafka
	await producer.send({
		topic: "players-state",
		messages: [
			{
				value: JSON.stringify(playerNewState),
			},
		],
	})
}

// update player position after every 3 seconds
setInterval(() => {
	producePlayerState()
		.then(() => console.log("Player State Updated!"))
		.catch(console.error)
}, 3000)
