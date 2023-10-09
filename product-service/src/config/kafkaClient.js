import {Kafka} from "kafkajs"

export const kafka = new Kafka({
    clientId: 'product',
    brokers: ['demo-kafka:9092']
})