
import productDatas from "../../../mongodb/models/productModels/productModels.js";
import {productProducer} from "../../../../../event/productProducer.js"
const productRepositoryImp = () => {
  const addedProduct = async (productData) => {
    try {
      const product = new productDatas({
        productName: productData?.getProductName(),
        category: productData?.getCategory(),
        price: productData?.getPrice(),
        description: productData?.getDescription(),
        image: productData?.getImage()
      });

      return await product.save();
    } catch (error) {
      console.error("Error in addedProduct:", error);
      throw error; // Rethrow the error to be handled in the calling function
    }
  };

  
const orderedProducts = async (productId, userId, address) => {
  try {
      console.log(productId, userId, address, "user implement buy products");
      const products = await productDatas.find({ _id: { $in: productId } });
      console.log(products, "ppppppppppppppppp");
      let orderData = {
          products,
          userId,
          address
      };
      console.log(orderData);

      // Call the productProducer function and await its response
      await productProducer(orderData, 'order', 'orderedProducts');
      return orderData
  // Return the response from orderedProducts
  } catch (error) {
      console.error("Error in orderedProducts:", error);
      throw error; // Throw the error to be caught by the caller
  }
};
  const getProducts = async() =>{
      
    try{
      const products = await productDatas.find();
      return products;
    } catch(error){
      console.error("Error in getProducts:", error);
      throw error;
    }
  }
  const productDetails = async (productId) =>{
      
    try{
        
      const product = await productDatas.findOne({_id:productId})
      console.log(product,"kittitittitiitiitit");
      return product
    } catch(error){
      console.log(error,"error in the productDetails query");
    }
  }
  return {
    addedProduct,
    orderedProducts,
    getProducts,
    productDetails,
    
  };
};

export default productRepositoryImp;
