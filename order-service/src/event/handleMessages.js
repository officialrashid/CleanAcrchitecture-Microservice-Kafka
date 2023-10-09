import createOrder from "../application/usecase/order/createOrder.js";
import orderRepositoriInf from '../application/repositories/order/orderRepositoriInf.js';
import orderRepositoryImp from '../framework/database/mongodb/repositories/order/orderRepositoryImp.js';

const orderDbRepository = orderRepositoriInf(orderRepositoryImp());
export const handleMessage = async (data,type) =>{
    let products = data.products
    let userId = data.userId
    let address = data.address
    console.log(products,";;;;;");
    console.log(userId,"::::");
    console.log(address,">>>>>>>>");
      try{
          
        if(type === "orderedProducts"){

            await createOrder(products,userId,address,orderDbRepository).then((response)=>{
              console.log(response,"{}{}{}{}{}{}{}{}{}{}{}{}{}");
              if(response){
                return response;
              }
            })
        }
      } catch(error){
        console.log(error,"error in the order Handle message");
      }
   
}