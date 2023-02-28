import {Router}  from "express";
import { getAll,getOne,deleteService,addService,editService } from "../Controllers/ServiceController.js";
import imageHandler from "../Middlewares/imageHandler.js";
const serviceRouter = Router()


serviceRouter.get('/', getAll)
serviceRouter.get('/:id',getOne)
serviceRouter.post('/',imageHandler,addService)
serviceRouter.patch('/:id', imageHandler,editService)
serviceRouter.delete('/:id', deleteService)

export default serviceRouter
