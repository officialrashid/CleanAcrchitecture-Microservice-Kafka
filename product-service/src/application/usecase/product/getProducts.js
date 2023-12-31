const getProducts = async (repositories, productService) => {
  try {
    const response = await repositories.getProducts();


    return { status: true, products: response };
  } catch (error) {
    console.error("Error in getProducts use case:", error);
    throw error;
  }
};

export default getProducts;
