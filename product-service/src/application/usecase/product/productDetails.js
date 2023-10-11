const productDetails = async (productId, repositories, productService) => {
    try {
        const response = await repositories.productDetails(productId);

        if (response) {

            return { status: true, product: response };
        }
    } catch (error) {
        console.log(error, "error in the product detail usecase");
        throw error; // Re-throw the error to be caught in the controller
    }
};

export default productDetails;
