import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from './src/Routes/UserRoute.js'
import connectDB from './src/Config/config.js';
import serviceRouter from "./src/Routes/ServiceRoute.js";
import productRouter from "./src/Routes/ProductRoute.js";
connectDB()
let port= process.env.PORT ||5000
dotenv.config()
const app = express();
connectDB();

dotenv.config();


if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cors());

app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.get('/', (req, res) => {
res.send({status: 200, message: 'OK'});
})
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send({status:500, message:'Something broke!',error:err.stack});
});
app.use('/api/users',userRouter)
app.use('/api/products',productRouter)
app.use('/api/services',serviceRouter)
app.use('/uploads', express.static('uploads'))
app.use('*', (req,res) => {
  res.status(404).send({message: '404 Not Found'})
})

app.listen(port, (req, res) => {
console.log(`listening on http://localhost:${port}`)
})
