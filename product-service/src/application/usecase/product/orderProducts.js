
const orderProducts = async (productId, userId, address, repositories, productService) => {


   try {

      const products = await repositories.orderedProducts(productId, userId, address)
      if (products) {

         return ({ status: true, products: products })
      }


   } catch (error) {

   }

}

export default orderProducts;