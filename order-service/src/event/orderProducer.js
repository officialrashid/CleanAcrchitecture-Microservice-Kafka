
import {kafka} from "../config/kafkaClient.js"


const producer = kafka.producer()

export const orderProducer = async (sendData,topic,type)=>{

    try{
        if(!sendData){
            throw new Error ("Invalid Send Data")
        }
        await producer.connect()
        console.log(sendData,"sendData coming in the producer");
        const messagePayload = {
            type: type,
            data: sendData // Your actual data here
        };
        const result = await producer.send({
            topic: topic,
            messages: [{ value: JSON.stringify(messagePayload) }]
        })
        console.log(result, '////////////result');
        if (result && result[0] && result[0]?.error) {
            throw new Error('Message production failed')
        }

    } catch(err){
        console.log(err,"err in the product producer");
    } finally{
        await producer.disconnect()
    }
}