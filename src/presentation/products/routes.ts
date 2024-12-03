import { Router } from "express";
import { ProductDatasoruceImpl, ProductRepositoryImpl } from "../../infrastructure";
import { ProductController } from "./controllers";





export class ProductRoutes {

    constructor() {}


    static get routes(): Router {

        const router = Router();

        const dataSource = new ProductDatasoruceImpl();
        const productRepository = new ProductRepositoryImpl(dataSource);

        const controller  = new ProductController(productRepository)



        router.post('/create', controller.createProduct )
        router.get('/list', controller.getAllProducts )



        return router

    }

}