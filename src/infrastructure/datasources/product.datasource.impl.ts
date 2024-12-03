import { ProductModel } from "../../databases";
import { CustomError } from "../../domain";
import { ProductDatasource } from "../../domain/datasources/product.datasource";
import { ProductDto } from "../../domain/dtos/product/product-create.dto";
import { ProductEntity } from "../../domain/entities/product.entity";
import { ProductMapper } from "../mappers/product.mapper";


export class ProductDatasoruceImpl implements ProductDatasource {

    constructor(){}

    
    getAllProducts(): Promise<ProductEntity[]> {
        throw new Error("Method not implemented.");
    }
    
    
    async createProduct(productDto: ProductDto): Promise<ProductEntity> {

        const { title, description, cost, tax, price = 0 } = productDto;

        try {

            const product = await ProductModel.create({
                title, description, cost, tax, price
            });

            return ProductMapper.productEntityFromObject(product)
                  
        } catch (error) {
            console.log(error)
            if(error instanceof CustomError){
                throw error;
            }

            throw CustomError.internalServer();
            
        }

    }
    

}