const productDal= require("../dals/productDal");
const ApiResponse= require("../helpers/apiResponse");

const productController= new Object();

productController.createProduct=async(req)=>{
    const result =  await productDal.createProduct(req.body);
    return new ApiResponse(result.status ? 200 : 400,result.status, result.message, result.data);
};


// productController.getAllProducts = async()=>{
//     const result= await productDal.getAllProduct();
//     return new ApiResponse(result.status ? 200 : 400,result.status, result.message,result.data);
// };

productController.getAllProducts = async (req) => {
  const result = await productDal.getAllProduct(req);
  return new ApiResponse(
    result.status ? 200 : 400,
    result.status,
    result.status ? "Products fetched successfully" : "Failed to fetch products",
    result.data
  );
};

productController.getById= async(req)=>{
    const result= await productDal.getById(req.params.id);
    return new ApiResponse(result.status ? 200 : 400, result.status, result.message, result.data);
};jiyoffrin

productController.updateProduct= async(req)=>{
    const result= await productDal.updateProduct(req.params.id,req.body);
    return new ApiResponse(result.status ? 200:400, result.status, result.message, result.data);
};

productController.deleteProduct=async(req)=>{
    const result=await productDal.deleteProduct(req.params.id);
    return new ApiResponse(result.status ? 200:400, result.status,result.message,result.data)
};

module.exports= productController;
