const express= require("express");
const bodyParser=require("body-parser");
const morgan=require("morgan");
const cors=require("cors");
const dotenv=require("dotenv");
const conncetDb=require("./src/config/db");
const productRouter=require("./src/routers/productRoute");

dotenv.config();

const app = express();
const PORT=process.env.PORT || 8080;

app.use(cors({ origin: "*", credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api/product",productRouter);


const startServer = async () => {
  await conncetDb();
  app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
};

startServer();