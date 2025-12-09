const express= require("express");
const productController= require("../controllers/productController");
const router= express.Router();

router.post("/post",async(req,res)=>{
    const result=await productController.createProduct(req);
    res.status(result.code).send(result);
});

router.get("/getall",async(req,res)=>{
    const result=await productController.getAllProducts(req);
    res.status(result.code).send(result);
});


router.get("/getbyid/:id",async(req,res)=>{
    const result= await productController.getById(req);
    res.status(result.code).send(result);
});

router.put("/update/:id",async(req,res)=>{
    const result=await productController.updateProduct(req);
    res.status(result.code).send(result);
});

router.delete("/delete/:id",async(req,res)=>{
    const result=await productController.deleteProduct(req);
    res.status(result.code).send(result);
});

module.exports=router;