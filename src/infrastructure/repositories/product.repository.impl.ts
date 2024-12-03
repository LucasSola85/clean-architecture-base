import { ProductDatasource } from "../../domain/datasources/product.datasource";
import { ProductDto } from "../../domain/dtos/product/product-create.dto";
import { ProductEntity } from "../../domain/entities/product.entity";
import { ProductRepository } from "../../domain/repositories/product.repository";



export class ProductRepositoryImpl implements ProductRepository {

    constructor(
        private readonly productDatasource: ProductDatasource
    ){}
    
    
    createProduct(productDto: ProductDto): Promise<ProductEntity> {
        return this.productDatasource.createProduct(productDto)
    }
    
    
    
    getAllProducts(): Promise<ProductEntity[]> {
        return this.productDatasource.getAllProducts()
    }
}