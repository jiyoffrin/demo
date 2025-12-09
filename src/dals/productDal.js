const productModel = require("../models/productModel");
const productDal = new Object();

productDal.createProduct = async (data) => {
    try {
        let products;


        if (Array.isArray(data)) {
            products = await productModel.insertMany(data);
        } else {

            const product = new productModel(data);
            products = await product.save();
        }

        return { status: true, message: "Product(s) Created", data: products };
    } catch (err) {
        return { status: false, data: err.message };
    }
};

// productDal.getAllProduct= async()=>{
//     try{
//         const products= await productModel.find();
//         return{ status: true, message:"Products fetched ", data:products};
//     }
//     catch(err){
//        return{ status: false,data:err.message};
//     }
// };

productDal.getAllProduct = async (req) => {
    try {

        //Pagination

        const page = req?.query?.page ? parseInt(req.query.page) : 0;
        const limit = req?.query?.limit ? parseInt(req.query.limit) : 10;
        const skip = page * limit;

        const query = [{ deleted: false }];

        //Filtering

        if (req?.query?.brand) query.push({ brand: req.query.brand });
        if (req?.query?.category) query.push({ category: req.query.category });


        //Search

        // if(req?.query?.search){
        //     query.push({
        //         Product_name: {$regex: req.query.search, $options: "i"}
        //     });
        // }

        if (req?.query?.search) {
            const searchValue = req.query.search;
            query.push({
                $or: [
                    { Product_name: { $regex: searchValue, $options: "i" } },
                    { brand: { $regex: searchValue, $options: "i" } },
                    { category: { $regex: searchValue, $options: "i" } }
                ]
            });
        }

        // ↕️ Sorting (default: A–Z by Product_name)
        const sortBy = req?.query?.sortBy || "Product_name";
        const order = req?.query?.order === "desc" ? -1 : 1;
        const sortOption = { [sortBy]: order };

        const totalCount = await productModel.find({ $and: query }).countDocuments();
        const products = await productModel
            .find({ $and: query })
            // .sort({ Product_name: 1 })
            .sort(sortOption)
            .skip(skip)
            .limit(limit)
            .exec();

        const response = {
            totalCount,
            fetchCount: products.length,
            data: products
        };

        return { status: true, data: response };

    } catch (err) {
        return { status: false, data: err.message };
    }
};


// productDal.getById = async (id) => {
//     try {
//         const product = await productModel.findById(id);
//         return product
//             ? { status: true, message: "Product found !", data: product }
//             : { status: false, message: "Product not found !", data: {} };
//     }
//     catch (err) {
//         return { status: false, data: err.message };
//     }
// };


productDal.getById = async (id) => {
    try {
        const product = await productModel.findOne({ _id: id, deleted: false });
        return product
            ? { status: true, message: "Product found!", data: product }
            : { status: false, message: "Product not found!", data: {} };
    } catch (err) {
        return { status: false, data: err.message };
    }
};

productDal.updateProduct = async (id, data) => {
    try {
        const product = await productModel.findByIdAndUpdate(id, data, { new: true });
        return product
            ? { status: true, message: "Product Updated", data: product }
            : { status: true, message: "Product not found", data: {} };
    }
    catch (err) {
        return { status: false, data: err.message };
    }

};

// productDal.deleteProduct = async (id) => {
//   try {
//     const product = await productModel.findByIdAndDelete(id);
//     return { status: true, message: "Product deleted", data: product };
//   }
//    catch (err) {
//     return { status: false, message: err.message };
//   }
// };



productDal.deleteProduct = async (id) => {
    try {
        const product = await productModel.findByIdAndUpdate(
            id,
            { deleted: true },
            { new: true }
        );
        return { status: true, message: "Product deleted", data: product };
    } catch (err) {
        return { status: false, data: err.message };
    }
};


module.exports = productDal;


// http://localhost:5050/api/product/getall?search=watch&category=Wearables&sortBy=price&order=desc