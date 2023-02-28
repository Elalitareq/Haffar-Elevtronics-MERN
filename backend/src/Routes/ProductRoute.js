import {Router}  from "express";
import { getAll,getOne,deleteProduct,addProduct,editProduct } from "../Controllers/ProductController.js";
import imageHandler from "../Middlewares/imageHandler.js";
const productRouter = Router()


productRouter.get('/', getAll)
productRouter.get('/:id',getOne)
productRouter.post('/',imageHandler,addProduct)
productRouter.patch('/:id', imageHandler,editProduct)
productRouter.delete('/:id', deleteProduct)

export default productRouter
