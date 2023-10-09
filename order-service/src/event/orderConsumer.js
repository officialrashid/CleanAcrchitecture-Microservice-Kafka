import { kafka } from "../config/kafkaClient.js";
import { handleMessage } from "../event/handleMessages.js";
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
                console.log(message,"ooooooooooooooooooooo");
                console.log(message.value,"ooooooooooooooooooooo1111111111111");
                const binaryData = message.value;
                const jsonString = binaryData.toString(); // Convert binary data to a string
                console.log(jsonString,"after convert to string");
                const jsonData = JSON.parse(jsonString); // Parse the string as JSON
                console.log("Received JSON data:", jsonData.data);
                
                const messageType = jsonData.type;
                console.log("Received message type:", messageType);
                // Handle the JSON data as needed
                const response = await handleMessage(jsonData.data,messageType)
                    console.log("response in handle message",response);
             
            }
        });
    } catch (err) {
        console.error('Error in Kafka consumer:', err);
    }
};

// Call the consumeOrder function to start the consumer
consumeOrder();
