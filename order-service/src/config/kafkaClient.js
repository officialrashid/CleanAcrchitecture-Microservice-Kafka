import {Kafka} from "kafkajs"

export const kafka = new Kafka({
    clientId: 'order',
    brokers: ['demo-kafka:9092']
})