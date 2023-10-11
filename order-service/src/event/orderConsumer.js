import { kafka } from "../config/kafkaClient.js";
import { handleMessage } from "../event/handleMessages.js";
import { orderProducer } from "../event/orderProducer.js"
const consumer = kafka.consumer({
    groupId: 'order-service'
});

export const consumeOrder = async () => {
    console.log("Consumer started");
    try {
        await consumer.connect();
        console.log('Consumer connected');

        await consumer.subscribe({ topic: 'order', fromBeginning: true });
        await consumer.run({
            eachMessage: async ({ message }) => {

                const binaryData = message.value;
                const jsonString = binaryData.toString(); // Convert binary data to a string
                const jsonData = JSON.parse(jsonString); // Parse the string as JSOn
                const messageType = jsonData.type;

                // Call handleMessage and wait for it to complete
                const response = await handleMessage(jsonData.data, messageType)
                // Further processing or logging based on the response
                if (response) {
                    await orderProducer(response, 'product', 'successOrdered')
                }
            }
        });
    } catch (err) {
        console.error('Error in Kafka consumer:', err);
    }
};

// Call the consumeOrder function to start the consumer
consumeOrder();
