import { ProductDto } from "../dtos/product/product-create.dto";
import { ProductEntity } from "../entities/product.entity";



export abstract class ProductDatasource {

    abstract createProduct( productDto: ProductDto ): Promise<ProductEntity>;
    abstract getAllProducts(): Promise<ProductEntity[]>;
    

}