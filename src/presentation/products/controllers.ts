import { Request, Response } from "express";
import { ProductRepository } from "../../domain/repositories/product.repository";
import { ProductDto } from "../../domain/dtos/product/product-create.dto";
import { CreateProduct } from "../../domain/uses-cases/product/create-product.use-case";
import { HandlerError } from "../errors/handler.error";
import { ProductModel } from "../../databases";




export class ProductController {


    constructor(
        private readonly productRepository: ProductRepository
    ){}


    createProduct = ( req: Request, res: Response ) =>{

        const [ error, productDto ] = ProductDto.create( req.body );
        if(error) return res.status(400).json(error);

        new CreateProduct(this.productRepository)
            .execute(productDto!)
            .then((data) => res.status(200).json(data))
            .catch((error) => HandlerError.launch(error, res))

    }


    getAllProducts = async (req: Request, res: Response) => {
        try {
          const products = await ProductModel.find().lean();
          const sanitizedProducts = products.map(({ _id, ...rest }) => rest);
      
          res.status(200).json(sanitizedProducts);

        } catch (error) {
          HandlerError.launch(error, res);
        }
      };



}