const { Double } = require("bson");
const db=require("../config/db");
const mongoose = require("mongoose");

const productSchema= new mongoose.Schema(
    {
        Product_name:{ type: String, default:null},
        brand:{type:String, default:null},
        price: { type: Number, default: null },
        category:{ type:String, default:null},
         deleted: { type: Boolean, default: false },
    },
    {timestamps: true }
);

module.exports = mongoose.model("Product",productSchema);