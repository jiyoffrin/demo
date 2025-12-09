const mongoose= require("mongoose");

const conncetDb= async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅MongoDb successfully connected");
    }
    catch(err){
        console.error("❌MongoDb connection failed:",err.message);
        process.exit(1);
    }
};

module.exports=conncetDb;