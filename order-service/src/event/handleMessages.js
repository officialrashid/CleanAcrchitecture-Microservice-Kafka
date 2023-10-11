import createOrder from "../application/usecase/order/createOrder.js";
import orderRepositoriInf from '../application/repositories/order/orderRepositoriInf.js';
import orderRepositoryImp from '../framework/database/mongodb/repositories/order/orderRepositoryImp.js';

const orderDbRepository = orderRepositoriInf(orderRepositoryImp());

export const handleMessage = async (data, type) => {
    try {
        if (type === "orderedProducts") {
            const response = await createOrder(data.products, data.userId, data.address, orderDbRepository);
            return response;
        }
    } catch (error) {
        console.error("Error in handleMessage:", error);
        return null; // Handle the error appropriately
    }
};
