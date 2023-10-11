
import {kafka} from "../config/kafkaClient.js"


const producer = kafka.producer()

export const productProducer = async (sendData,topic,type)=>{
  
    try{
        if(!sendData){
            
            throw new Error ("Invalid Send Data")
        }
        await producer.connect(console.log("conneted to produce"));
    
        const messagePayload = {
            type: type,
            data: sendData // Your actual hjhdata here
        };
        console.log(messagePayload.data,"message payload cming to the producer");
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